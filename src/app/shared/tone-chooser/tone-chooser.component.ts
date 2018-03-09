import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tone-chooser',
  templateUrl: './tone-chooser.component.html',
  styleUrls: ['./tone-chooser.component.scss']
})
export class ToneChooserComponent implements OnInit {

  @Input() tones: string[];
  @Output() chosen = new EventEmitter<string[]>();
  private chosenTones: string[] = [];
  constructor() { }

  ngOnInit() {
  }

  chooseTone(event, tone) {
    if (event.target.checked) {
      this.addTone(tone);
    } else {
      this.deleteTone(tone);
    }
    this.chosen.emit(this.chosenTones);
  }

  addTone(tone) {
    if (this.chosenTones.indexOf(tone) !== -1) { return; }
    this.chosenTones.push(tone);
  }

  deleteTone(tone) {
    let toneInd;
    if ((toneInd = this.chosenTones.indexOf(tone)) === -1) { return; }
    this.chosenTones.splice(toneInd, 1);
  }

}
