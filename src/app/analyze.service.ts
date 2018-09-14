import { Injectable } from '@angular/core';
import { ResultData } from './models/result-data';
import { OverallScore } from './models/overall-score';
import { GraphSingleSeries } from './models/graph-single-series';
import { NgramsInfo } from './models/ngrams-info';

@Injectable()
export class AnalyzeService {

  constructor() { }

  getOverallTonalityScore(data: ResultData): OverallScore {
    const overall = new OverallScore({love: 0, hate: 0, fear: 0, positivity: 0, negativity:0, violence: 0, desire: 0, skepticism: 0});
    data.texts.forEach(item => {
      item.tonality.forEach(tonality => {
        overall[tonality.tone] += tonality.score;
      });
    });
    return overall;
  }

  getNgramsByTones(data: ResultData): {[key: string]: NgramsInfo[]} {
    const ngrams = {};
    data.texts.forEach(item => {
      item.tonality.filter(tnl => tnl.score).forEach(tonality => {
        ngrams[tonality.tone] = ngrams[tonality.tone] || {};
        tonality.sentences.filter(sent => sent.score).forEach(sentence => {
          sentence.ngrams.forEach(ngram => {
            if (!(ngram.ngram in ngrams[tonality.tone])) {
              ngrams[tonality.tone][ngram.ngram] = {score: ngram.score, sentences: [sentence.text]};
            } else {
              ngrams[tonality.tone][ngram.ngram].score += ngram.score;
              ngrams[tonality.tone][ngram.ngram].sentences.push(sentence.text);
            }
          });
        });
      });
    });
    const preparedData = {};
    for (let tone in ngrams) {
      preparedData[tone] = [];
      for(let word in ngrams[tone]) {
        preparedData[tone].push({text: word, score: ngrams[tone][word].score, sentences: ngrams[tone][word].sentences, show: false});
      }
      preparedData[tone] = preparedData[tone].sort((a, b) => b.score - a.score)
    }
    return preparedData;
  }

  getSingleGraphSeries(data: OverallScore, fileName: string): GraphSingleSeries {
    const result = {name: fileName, series: []};
    for (let tonality in data) {
      result.series.push({name: tonality, value: data[tonality]});
    }
    return result;
  }

}
