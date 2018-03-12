import { Component, OnInit, Input } from '@angular/core';
import { AgWordCloudData } from 'angular4-word-cloud';
@Component({
  selector: 'word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent implements OnInit {

  @Input() data: AgWordCloudData[];
  options;
  constructor() { }

  ngOnInit() {
    this.options = {
        settings: {
            minFontSize: 10,
            maxFontSize: 100,
        },
        margin: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        },
        labels: true // false to hide hover labels
    };
  }

}
