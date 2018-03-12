import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ParserService } from './parser.service';
import { UploadText } from '../../models/upload-text';

@Component({
  selector: 'file-parser',
  templateUrl: './file-parser.component.html',
  styleUrls: ['./file-parser.component.scss'],
  providers: [ParserService]
})
export class FileParserComponent implements OnInit {
  @Output() fileData = new EventEmitter<{data: UploadText[], name: string}>();
  @ViewChild('fileloader') fileloader: ElementRef;
  mainField = 'content';
  titleField = 'title';
  breakByLine = true;
  file: File;
  txtPresetsShow = false;
  tablePresetsShow = false;
  loading = false;
  constructor(private parser: ParserService) {}

  ngOnInit() {
  }

  clickFileInput() {
    this.fileloader.nativeElement.click();
  }

  loadFile(event) {
    if (this.loading) { return; }
    this.file = event.srcElement.files[0];
    if (!this.file) {
      return;
    }
    this.loading = true;
    this.parser.loadFile(this.file).subscribe(res => {
      let preparedData = this.prepareData(res, this.file.type);
      this.loading = false;
      this.fileData.emit({name: this.file.name, data: preparedData});
    });
  }

  reloadFile() {
    if (this.loading) { return; }
    this.parser.loadFile(this.file).subscribe(res => {
      let preparedData = this.prepareData(res, this.file.type);
      this.fileData.emit({name: this.file.name, data: preparedData});
    });
  }

  prepareData(rawData: string | any[], type: string, breakByParagraph?: boolean) {
    console.log(rawData, this.mainField, this.titleField);
    let texts = [];
    if (rawData instanceof Array) {
      rawData.forEach((item, index) => {
        if (!item[this.mainField]) {return}
        texts.push ({
          body: item[this.mainField],
          title: item[this.titleField] || 'string ' + index,
          id: index
        })
      })
    } else {
      if (this.breakByLine) {
        let txtArray = rawData.split(/\n/);
        txtArray.forEach((item, index) => {
          texts.push({
          body: item.replace(/\s+/g, ' ').trim(),
            title: 'paragraph ' + index,
            id: index
          })
        })
      } else {
        texts.push({
          body: rawData.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
          title: 'title',
          id: 0
        })
      }
    }
    console.log(texts);
    return texts;
  }

  setContentField(event) {
    this.mainField = event.target.value;
  }

  setTitleField(event) {
    this.titleField = event.target.value;
  }

  setBreak(event) {
    this.breakByLine = event.target.value;
  }

}
