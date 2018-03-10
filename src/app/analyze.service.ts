import { Injectable } from '@angular/core';
import { ResultData } from './models/result-data';
import { OverallScore } from './models/overall-score';

@Injectable()
export class AnalyzeService {

  constructor() { }

  getOverallTonalityScore(data: ResultData): OverallScore {
    let overall = new OverallScore({love: 0, hate: 0, fear: 0, positivity: 0, negativity:0, violence: 0, desire: 0, skepticism: 0});
    data.texts.forEach(item => {
      item.tonality.forEach(tonality => {
        overall[tonality.tone] += tonality.score;
      })
    })
    return overall;
  }

  getNgramsByTones(data: ResultData) {
    let ngrams = {};
    data.texts.forEach(item => {
      item.tonality.forEach(tonality => {
        if (tonality.score) {
          if (!(tonality.tone in ngrams)) {
            ngrams[tonality.tone] = {};
          }
          tonality.sentences.forEach(sentence => {
            if (sentence.score) {
              sentence.ngrams.forEach(ngram => {
                if (!(ngram.ngram in ngrams[tonality.tone])) {
                  ngrams[tonality.tone][ngram.ngram] = ngram.score;
                } else {
                  ngrams[tonality.tone][ngram.ngram] += ngram.score;
                }
              })
            }
          })
        }
      })
    });
    return ngrams;
  }

}
