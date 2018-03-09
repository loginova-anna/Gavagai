import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';
import { RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  getLanguages() {
    let isoLang = this.getIsoLangs();
    return  (["AR", "AZ", "BG", "BN", "CA", "CS", "DA", "DE", "EL", "EN", "ES", "ET", "FA", "FI", "FR", "HE", "HI", "HR", "HU", "ID", "IS", "IT", "JA", "JV", "KO", "LT", "LV", "MS", "NL", "NO", "PL", "PT", "RO", "RU", "SK", "SL", "SQ", "SV", "SW", "TH", "TL", "TR", "UK", "UR", "VI", "ZH"]);
    // return this.http.get(this.getUrl('/languages')).subscribe(res => console.log(res.json()));
  }

  getFileAnalysis(file: File) {
    let header = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: header
   });
    let fd = new FormData();
    fd.append('file', file);
    let data = {
      "sourceId": 12345,
      "language": "EN",
      "tones": [
        "love",
        "hate"
      ],
      "includeSentences": true
    };
    let txtdata = {
      "texts": [
        {
          "body": "i love you",
          "title": "bla",
          "id": "1"
        },
        {
          "body": "i hate you",
          "title": "got",
          "id": "2"
        },
        {
          "body": "i don't know you well to tell if i love or hate you",
          "title": "got",
          "id": "3"
        },
        {
          "body": "you are so georgeous, i would like to spend all my life with you",
          "title": "got",
          "id": "4"
        },
        {
          "body": "i think you have part og the brain mulfunctioning",
          "title": "got",
          "id": "5"
        },
        {
          "body": "i think you could hardly be loved",
          "title": "got",
          "id": "5"
        }
      ],
      "language": "en",
      "tones": [
        "positivity",
        "negativity"
      ],
      "includeSentences": true
    };
    // return this.http.post(this.getUrl('/tonality'), JSON.stringify(txtdata), options).subscribe(res => console.log(res.json()));
  }

  getIsoLangs() {
    return this.http.get('../assets/json/iso-639-1.json')
    .map(res => {
      let isoLangs = JSON.parse(res.text());

      return this.getLanguages().map(item => (
        {
          code: item,
          name: isoLangs[item.toLowerCase()].name
        }
      ));
    })
  }

  getTones() {
    return ['positivity', 'negativity', 'fear', 'hate', 'love', 'skepticism', 'violence', 'desire'];
  }

  getUrl(part: string): string {
    return environment.apiBaseUrl + part + '?apiKey=' + environment.apiKey;
  }
}
