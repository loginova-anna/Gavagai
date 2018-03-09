import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToneChooserComponent } from './tone-chooser/tone-chooser.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { DetailsListComponent } from './details-list/details-list.component';
import { TextDetailComponent } from './text-detail/text-detail.component';
import { LanguageSelectComponent } from './language-select/language-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ToneChooserComponent,
    VisualizerComponent,
    DetailsListComponent,
    TextDetailComponent,
    LanguageSelectComponent
  ],
  exports: [
    FormsModule,
    ToneChooserComponent,
    DetailsListComponent,
    LanguageSelectComponent
  ]
})
export class SharedModule { }
