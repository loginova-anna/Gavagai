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
  colorScheme = {
    domain: [
      '#23afb3',
      '#fd5700',
      '#ffa775',
      '#a5a8aa',
      '#a7d7d8',
      '#ffeaad',
      '#ffd01f',
      '#676766'
    ]
  };
  viewSize = [700, 400];
  constructor() { }

  ngOnInit() {
  }

  onSelect(event) {
    console.log(event);
  }

}
