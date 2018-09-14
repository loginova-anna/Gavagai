import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { AnalyzeService } from './services/analyze.service';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule
  ],
  providers: [ApiService, AnalyzeService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
