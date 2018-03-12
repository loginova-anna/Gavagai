import { Injectable } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as XLSX from 'ts-xlsx';
import { PDFJSStatic } from 'pdfjs-dist';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';

const PDFJS: PDFJSStatic = require('pdfjs-dist');

@Injectable()
export class ParserService {
    loadProgress = new Subject<number>();
    loadProgressObs: Observable<number>;
    pdfjs;
    constructor(private paparse: PapaParseService, private http: Http) {
        this.pdfjs = PDFJS;
        this.loadProgressObs = this.loadProgress.asObservable();
    }

    loadFile(file: File) {
        let reader = new FileReader();
        let result = new Subject<any>();
        switch (file.type) {
        case 'application/pdf':
            reader.onload = () => { this.readPdf(reader.result).then(res => result.next(res)) };
            break;
        case 'docx':
            reader.onload = () => { result.next(this.readDocx(reader.result)) };
            break;
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        case 'application/vnd.ms-excel':
            reader.onload = () => { result.next(this.readXls(reader.result)) };
            break;
        case 'text/txt': 
            reader.onload = () => { result.next(this.readTxt(reader.result)) };
            break;
        case 'application/json':
            reader.onload = () => { result.next(this.readJson(reader.result)) };
            break;
        case 'text/csv':
            reader.onload = () => { result.next(this.readCsv(reader.result)) };
            break;
        }
        reader.readAsArrayBuffer(file);
        return result.asObservable();
    }

    private readPdf(buffer) {
        return this.pdfjs.getDocument({data: buffer})
        .then(document => {
          let pagesPromises = Array(document.numPages).fill(0).map((value, index) => document.getPage(index+1));
          return Promise.all(pagesPromises);
        })
        .then(pages => {
          let contentsPromises = pages.map(page => page.getTextContent());
          return Promise.all(contentsPromises);
        })
        .then(contents => {
          let result = this.addNewLineSymbols(contents
            .reduce((total, value) =>  total ? total.concat(value.items) : value.items, []))
            .map(content => content.str)
            .join(' ');
          return result;
        });
      }
    

      // breaking PDF on paragraphs by adding a new line where line height is more than twice smaller
      // than the gap between lines
      private addNewLineSymbols(content) {
          let  lastY = content[0].transform[5];
          let delay = 0;
          let result = content.map(item => {
                let resItem = item;
                delay = resItem.transform[5]-lastY;
                lastY = resItem.transform[5];
                if (Math.abs(delay) >= resItem.height * 2) {
                    resItem.str = '\n' + item.str;
                }
              return resItem;
          })
          return result;
      }

      private readXls(buffer) {
        let data = new Uint8Array(buffer);
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          arr.push(String.fromCharCode(data[i]));
        }
        let workbook = XLSX.read(arr.join(''), {type: 'binary'});
        let first_sheet_name = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[first_sheet_name];
        return XLSX.utils.sheet_to_json(worksheet,{raw:true});
      }
    
      private readCsv(buffer) {
        let data = new Uint8Array(buffer);
        let arr = new Array();
        for (let i = 0; i != data.length; ++i) {
          arr[i] = String.fromCharCode(data[i]);
        }
        let bstr = arr.join('');
        let rawResult = this.paparse.parse(bstr).data;
        let columnNames = rawResult[0];
        rawResult.shift();
        return rawResult.map(item => {
                  let itemRes = {};
                  columnNames.forEach((cname, index) => {
                      itemRes[cname] = item[index];
                  })
                  return itemRes;
              });;
      }

      private readTxt(buffer) {

      }

      private readJson(buffer) {

      }

      private readDocx(buffer) {

      }
}