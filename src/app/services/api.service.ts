import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { UploadData } from '../models/upload-data';
import { Observable } from 'rxjs/Rx';
import { ResultData } from '../models/result-data';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  getLanguages() {
    // let isoLang = this.getIsoLangs();
    return  (["AR", "AZ", "BG", "BN", "CA", "CS", "DA", "DE", "EL", "EN", "ES", "ET", "FA", "FI", "FR", "HE", "HI", "HR", "HU", "ID", "IS", "IT", "JA", "JV", "KO", "LT", "LV", "MS", "NL", "NO", "PL", "PT", "RO", "RU", "SK", "SL", "SQ", "SV", "SW", "TH", "TL", "TR", "UK", "UR", "VI", "ZH"]);
    // return this.http.get(this.getUrl('/languages', apiKey)).subscribe(res => {console.log(res.json()); return res.json(); });
  }

  getFileAnalysis(data: UploadData, apiKey: string): Observable<ResultData> {
    const header = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: header
   });
    return this.http.post(this.getUrl('/tonality', apiKey), JSON.stringify(data), options).map(res => res.json());
  }

  getIsoLangs() {
    return this.http.get('../assets/json/iso-639-1.json')
    .map(res => {
      const isoLangs = JSON.parse(res.text());

      return this.getLanguages().map(item => (
        {
          code: item,
          name: isoLangs[item.toLowerCase()].name
        }
      ));
    });
  }

  getTones() {
    return ['positivity', 'negativity', 'fear', 'hate', 'love', 'skepticism', 'violence', 'desire'];
  }

  getUrl(part: string, apiKey: string): string {
    return environment.apiBaseUrl + part + '?apiKey=' + apiKey;
  }
}
