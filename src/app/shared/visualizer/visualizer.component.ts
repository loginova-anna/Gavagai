import { Component, OnInit, Input } from '@angular/core';
import { GraphSingleSeries } from '../../models/graph-single-series';

@Component({
  selector: 'visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {
  @Input() fileName: string;
  @Input() data: GraphSingleSeries[];
  type: 'vchart' | 'hchart' | 'blocks' = 'vchart';
  role: 'single' | 'multi' = 'single';
  colorScheme = {domain: ['#23afb3', '#fd5700', '#ffa775', '#a5a8aa', '#a7d7d8', '#ffeaad', '#ffd01f', '#676766']};
  viewSize = [700, 400];
  constructor() { }

  ngOnInit() {
    console.log(this.data);
    // this.data = [
    //   {
    //     name: 'sdf',
    //   series: [
    //     {
    //       "name": "France",
    //       "value": 36745
    //     },
    //     {
    //       "name": "United Kingdom",
    //       "value": 36240
    //     },
    //     {
    //       "name": "Italy",
    //       "value": 35800
    //     },
    //     {
    //       "name": "French Southern Territories",
    //       "value": 50440
    //     },
    //     {
    //       "name": "Switzerland",
    //       "value": 38359
    //     },
    //     {
    //       "name": "Montserrat",
    //       "value": 49884
    //     }
    //   ]
    // }];
    // this.role = this.data.length < 2 ? 'single' : 'multi';
  }

  onSelect(event) {
    console.log(event);
  }

}
