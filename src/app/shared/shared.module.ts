import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PapaParseModule } from 'ngx-papaparse';
import { AgWordCloudModule } from 'angular4-word-cloud';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ToneChooserComponent } from './tone-chooser/tone-chooser.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { DetailsListComponent } from './details-list/details-list.component';
import { TextDetailComponent } from './text-detail/text-detail.component';
import { LanguageSelectComponent } from './language-select/language-select.component';
import { FileParserComponent } from './file-parser/file-parser.component';
import { WordCloudComponent } from './word-cloud/word-cloud.component';
import { NgramsInfoComponent } from './ngrams-info/ngrams-info.component';
import { HighlightPipe } from './highlight.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PapaParseModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    AgWordCloudModule.forRoot()
  ],
  declarations: [
    ToneChooserComponent,
    VisualizerComponent,
    DetailsListComponent,
    TextDetailComponent,
    LanguageSelectComponent,
    FileParserComponent,
    WordCloudComponent,
    NgramsInfoComponent,
    HighlightPipe
  ],
  exports: [
    FormsModule,
    ToneChooserComponent,
    VisualizerComponent,
    DetailsListComponent,
    LanguageSelectComponent,
    FileParserComponent,
    WordCloudComponent,
    NgramsInfoComponent,
    HighlightPipe
  ]
})
export class SharedModule { }
