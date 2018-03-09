import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {

  @Input() languages: {code: string, name: string}[];
  @Output() code = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

}
