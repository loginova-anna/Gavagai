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
        const reader = new FileReader();
        const result = new Subject<any>();
        switch (file.type) {
        case 'application/pdf':
            reader.onload = () => { this.readPdf(reader.result).then(res => result.next(res)); };
            break;
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        case 'application/vnd.ms-excel':
            reader.onload = () => { result.next(this.readXls(reader.result)); };
            break;
        case 'text/csv':
            reader.onload = () => { result.next(this.readCsv(reader.result)); };
            break;
        }
        reader.readAsArrayBuffer(file);
        return result.asObservable();
    }

    private readPdf(buffer) {
        return this.pdfjs.getDocument({data: buffer})
        .then(document => {
          const pagesPromises = Array(document.numPages).fill(0).map((value, index) => document.getPage(index + 1));
          return Promise.all(pagesPromises);
        })
        .then(pages => {
          const contentsPromises = pages.map(page => page.getTextContent());
          return Promise.all(contentsPromises);
        })
        .then(contents => {
          const result = this.addNewLineSymbols(contents
            .reduce((total, value) =>  total ? total.concat(value.items) : value.items, []))
            .map(content => content.str)
            .join(' ');
          return result;
        });
      }

      // breaking PDF on paragraphs by adding a new line where line height is more than twice smaller
      // than the gap between lines
      private addNewLineSymbols(content) {
          let lastY = content[0].transform[5];
          let delay = 0;
          const result = content.map(item => {
                const resItem = item;
                delay = resItem.transform[5] - lastY;
                lastY = resItem.transform[5];
                if (Math.abs(delay) >= resItem.height * 2) {
                    resItem.str = '\n' + item.str;
                }
              return resItem;
          });
          return result;
      }

      private readXls(buffer) {
        const data = new Uint8Array(buffer);
        const arr = [];
        for (let i = 0; i < data.length; i++) {
          arr.push(String.fromCharCode(data[i]));
        }
        const workbook = XLSX.read(arr.join(''), {type: 'binary'});
        const first_sheet_name = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[first_sheet_name];
        return XLSX.utils.sheet_to_json(worksheet, {raw: true});
      }

      private readCsv(buffer) {
        const data = new Uint8Array(buffer);
        const arr = [];
        for (let i = 0; i !== data.length; ++i) {
          arr[i] = String.fromCharCode(data[i]);
        }
        const bstr = arr.join('');
        const rawResult = this.paparse.parse(bstr).data;
        const columnNames = rawResult[0];
        rawResult.shift();
        return rawResult.map(item => {
                  const itemRes = {};
                  columnNames.forEach((cname, index) => {
                      itemRes[cname] = item[index];
                  });
                  return itemRes;
              });
      }
}
