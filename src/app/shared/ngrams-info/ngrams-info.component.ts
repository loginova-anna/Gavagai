import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { NgramsInfo } from '../../models/ngrams-info';
import { AgWordCloudData } from 'angular4-word-cloud';

@Component({
  selector: 'ngrams-info',
  templateUrl: './ngrams-info.component.html',
  styleUrls: ['./ngrams-info.component.scss']
})
export class NgramsInfoComponent implements OnInit {

  @Input() data: {[key: string]: NgramsInfo[]};
  cloudView = false;
  cloudData: AgWordCloudData[];
  selectedKey: string;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.selectedKey = Object.keys(this.data)[0];
    this.cloudData = this.getCloudData();
  }

  getKeys(): string[] {
    return Object.keys(this.data);
  }

  chooseTonality(key) {
    this.cloudView = false;
    this.selectedKey = key;
    this.cloudData = this.getCloudData();
    this.ref.detectChanges();
  }

  getCloudData() {
    if (!this.data[this.selectedKey]) { return; }
    return this.data[this.selectedKey].map(item => ({text: item.text, size: item.score}));
  }

}
