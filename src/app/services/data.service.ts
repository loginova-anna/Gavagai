import { Injectable } from '@angular/core';
import { FullFileData } from '../models/full-file-data';
import { UploadData } from '../models/upload-data';
import { ResultData } from '../models/result-data';
import { GraphSingleSeries } from '../models/graph-single-series';
import { NgramsInfo } from '../models/ngrams-info';

@Injectable()
export class DataService {
  files: FullFileData[] = [];
  currentFileId = -1;
  constructor() { }

  addFileData(
    name: string,
    data: UploadData,
    analysisData: ResultData,
    graphData: GraphSingleSeries,
    ngrams: any
  ) {
    this.files.push(new FullFileData(this.files.length + 1, name, data, analysisData, graphData, ngrams));
    this.setCurrentFile(this.files.length);
  }

  setCurrentFile(id) {
    this.currentFileId = id;
  }

  getCurrentFile(): FullFileData {
    if (this.currentFileId === -1) {return this.files[this.files.length]};

    return this.files.find(item => item.id === this.currentFileId);
  }

}
