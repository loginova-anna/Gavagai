import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PapaParseModule } from 'ngx-papaparse';

import { ToneChooserComponent } from './tone-chooser/tone-chooser.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { DetailsListComponent } from './details-list/details-list.component';
import { TextDetailComponent } from './text-detail/text-detail.component';
import { LanguageSelectComponent } from './language-select/language-select.component';
import { FileParserComponent } from './file-parser/file-parser.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PapaParseModule
  ],
  declarations: [
    ToneChooserComponent,
    VisualizerComponent,
    DetailsListComponent,
    TextDetailComponent,
    LanguageSelectComponent,
    FileParserComponent
  ],
  exports: [
    FormsModule,
    ToneChooserComponent,
    DetailsListComponent,
    LanguageSelectComponent,
    FileParserComponent
  ]
})
export class SharedModule { }
