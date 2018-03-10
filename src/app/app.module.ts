import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { AnalyzeService } from './analyze.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule
  ],
  providers: [ApiService, AnalyzeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
