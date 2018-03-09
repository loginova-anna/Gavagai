import { Component, OnInit, Input } from '@angular/core';
import { ResultItem } from '../../models/result-item';

@Component({
  selector: 'text-detail',
  templateUrl: './text-detail.component.html',
  styleUrls: ['./text-detail.component.scss']
})
export class TextDetailComponent implements OnInit {

  @Input() detail: ResultItem

  constructor() { }

  ngOnInit() {
  }

}
