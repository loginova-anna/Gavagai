import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ParserService } from './parser.service';

@Component({
  selector: 'file-parser',
  templateUrl: './file-parser.component.html',
  styleUrls: ['./file-parser.component.scss'],
  providers: [ParserService]
})
export class FileParserComponent implements OnInit {
  @Output() fileData = new EventEmitter<any[]>();
  @ViewChild('fileloader') fileloader: ElementRef;
  mainField = 'content';
  titleField = 'title';
  breakByLine = false;
  file: File;
  pdfjs;
  constructor(private parser: ParserService) {}

  ngOnInit() {
  }

  clickFileInput() {
    this.fileloader.nativeElement.click();
  }

  loadFile(event) {
    this.file = event.srcElement.files[0];
    this.parser.loadFile(this.file).subscribe(res => {
      let preparedData = this.prepareData(res, this.file.type);
      this.fileData.emit(preparedData);
    });
  }

  prepareData(rawData: string | any[], type: string, breakByParagraph?: boolean) {
    let texts = [];
    if (rawData instanceof Array) {
      rawData.forEach((item, index) => {
        texts.push ({
          body: item[this.mainField],
          title: item[this.titleField] || 'string ' + index,
          id: item['id'] || index
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
