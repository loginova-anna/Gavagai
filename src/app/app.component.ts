import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from './api.service';
import { ResultItem } from './models/result-item';
import { UploadText } from './models/upload-text';
import { Tonality } from './models/tonality';
import * as pdfjs from 'pdfjs-dist';
import { UploadData } from './models/upload-data';
import { AnalyzeService } from './analyze.service';

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
  fileData = [];
  languageCode = 'EN';

  constructor(private apiService: ApiService, private analyser: AnalyzeService) {}
  ngOnInit() {
    this.toneList = this.apiService.getTones();
    this.apiService.getIsoLangs().subscribe(res => this.languages = res);
    this.languages = this.apiService.getLanguages();
    this.apiService.getIsoLangs();
  }

  loadFile(event) {
    this.fileName = event.srcElement.files[0].name;
    let file = event.srcElement.files[0];
    this.apiService.getFileAnalysis(file);
  }

  setChosenTones(tones) {
    this.chosenTones = tones;
  }

  onFileDataLoad(data) {
    console.log(data);
    this.fileData = data;
  }

  setLanguageCode(lang) {
    this.languageCode = lang;
  }

  analyzeFile() {
    if (!this.fileData.length || !this.toneList.length) {
      return;
    }

    let analyzeData = new UploadData(
      this.fileData,
      this.languageCode,
      this.chosenTones,
      true
    )
    this.apiService.getFileAnalysis(analyzeData).subscribe(data =>
      // localStorage.setItem('testfile', JSON.stringify(data))
      {
        console.log(data);
        console.log(this.analyser.getOverallTonalityScore(data));
        console.log(this.analyser.getNgramsByTones(data));
      }
    );
  }
}
