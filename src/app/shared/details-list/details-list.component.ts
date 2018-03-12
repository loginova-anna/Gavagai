import { Component, OnInit, Input } from '@angular/core';
import { ResultItem } from '../../models/result-item';

@Component({
  selector: 'details-list',
  templateUrl: './details-list.component.html',
  styleUrls: ['./details-list.component.scss']
})
export class DetailsListComponent implements OnInit {

  @Input() list: ResultItem[];
  show = false;
  constructor() { }

  ngOnInit() {
    console.log(this.list);
  }

}
