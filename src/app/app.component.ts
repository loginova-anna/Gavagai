import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from './api.service';
import { ResultItem } from './models/result-item';
import { UploadText } from './models/upload-text';
import { Tonality } from './models/tonality';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  toneList: string[];
  chosenTones: string[];
  languages = [];
  fileName: string;
  @ViewChild('fileloader') fileloader: ElementRef;
  result = [
    new ResultItem(
      new UploadText(0, 'title 1', 'textlkdf dfg dfgfghf dfgdfg fggj'),
      [
        new Tonality('love', 1, 0.5, {}),
        new Tonality('love', 1, 0.5, {})
      ]
    ),
    new ResultItem(
      new UploadText(1, 'title 1', 'textlkdf dfg dfgfghf dfgdfg fggj'),
      [
        new Tonality('love', 1, 0.5, {}),
        new Tonality('love', 1, 0.5, {})
      ]
    ),
    new ResultItem(
      new UploadText(2, 'title 1', 'textlkdf dfg dfgfghf dfgdfg fggj'),
      [
        new Tonality('love', 1, 0.5, {}),
        new Tonality('love', 1, 0.5, {})
      ]
    ),
    new ResultItem(
      new UploadText(3, 'title 1', 'textlkdf dfg dfgfghf dfgdfg fggj'),
      [
        new Tonality('love', 1, 0.5, {}),
        new Tonality('love', 1, 0.5, {})
      ]
    )
  ]
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.toneList = this.apiService.getTones();
    this.apiService.getIsoLangs().subscribe(res => this.languages = res);
    this.languages = this.apiService.getLanguages();
    this.apiService.getIsoLangs();
  }

  loadFile(event) {
    console.log(event.target.value)
    this.fileName = event.target.value;
    let file = event.srcElement.files[0];
    this.apiService.getFileAnalysis(file);
  }

  setChosenTones(tones) {
    this.chosenTones = tones;
    console.log(this.chosenTones);
  }

  clickFileInput() {
    this.fileloader.nativeElement.click();
  }
}
