import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from './services/api.service';
import { ResultItem } from './models/result-item';
import { UploadText } from './models/upload-text';
import { Tonality } from './models/tonality';
import * as pdfjs from 'pdfjs-dist';
import { UploadData } from './models/upload-data';
import { AnalyzeService } from './services/analyze.service';
import { GraphSingleSeries } from './models/graph-single-series';
import { DataService } from './services/data.service';
import { FullFileData } from './models/full-file-data';
import { ResultData } from './models/result-data';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  toneList: string[];
  chosenTones: string[];
  languages = [];
  fileName: string;
  fileData;
  languageCode = 'EN';
  result;
  currentFile: FullFileData;
  ngramsId = 0;
  tab = 0;
  allFiles;
  compareGraphData;
  apiKey: string;
  error: string;
  detailsData: ResultItem[];
  constructor(
    private apiService: ApiService,
    private analyser: AnalyzeService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.toneList = this.apiService.getTones();
    this.apiService.getIsoLangs().subscribe(res => this.languages = res);
    this.languages = this.apiService.getLanguages();
  }

  setChosenTones(tones) {
    this.chosenTones = tones;
  }

  onFileDataLoad(data) {
    this.fileData = data;
  }

  setLanguageCode(lang: string) {
    this.languageCode = lang;
  }

  analyzeFile() {
    if (!this.fileData || !this.fileData.data || !this.fileData.data.length || !this.toneList.length || !this.apiKey) {
      this.error = !this.fileData || !this.fileData.data || !this.fileData.data.length ? 'No file was loaded' :
        !this.apiKey ? 'Please enter your ApiKey' : '';
      return;
    }
    if (!this.fileData.data[0].body) {
      this.error = 'Wrong data format (check presets for csv, xls)';
      return;
    }
    this.error = '';
    const uploadData = new UploadData(
      this.fileData.data,
      this.languageCode,
      this.toneList,
      true
    );
    this.apiService.getFileAnalysis(uploadData, this.apiKey).subscribe(data => {
        const scoreData = this.analyser.getOverallTonalityScore(data);
        const graphData = this.analyser.getSingleGraphSeries(scoreData, this.fileData.name);
        const ngramsData = this.analyser.getNgramsByTones(data);
        this.dataService.addFileData(this.fileData.name, uploadData, data, graphData, ngramsData);
        this.currentFile = this.dataService.getCurrentFile();
        this.detailsData = this.getDetails();
        this.allFiles = this.dataService.files;
      }
    );
  }

  getDetails() {
    const data = this.currentFile.analysisData;
    return data.texts.map(item => new ResultItem(this.currentFile.fileData.texts[+item['id']], item.tonality));
  }

  buildCompareData() {
    if (!(this.dataService.files && this.dataService.files.length)) { return; }
    const dataArr = this.dataService.files.map(item => item.graphData);
    const result = [];
    dataArr[0].series.forEach(tonality => {
      const item = {name: tonality.name, series: []};
      dataArr.forEach(file => {
        item.series.push({name: file.name, value: file.series.find(s => s.name === tonality.name).value})
      });
      result.push(item);
    });
    this.compareGraphData = result;
  }

  setCurrentFile(id) {
    this.dataService.setCurrentFile(id);
    this.currentFile = this.dataService.getCurrentFile();
    this.detailsData = this.getDetails();
  }

  selectTab(t) {
    this.tab = t;
  }
}
