import { UploadData } from "./upload-data";
import { ResultData } from "./result-data";
import { GraphSingleSeries } from "./graph-single-series";
import { NgramsInfo } from "./ngrams-info";

export class FullFileData {
    constructor(
        public id: number,
        public name: string,
        public fileData: UploadData,
        public analysisData?: ResultData,
        public graphData?: GraphSingleSeries,
        public ngramsData?: {[key: string]: NgramsInfo[]}
    ) {}
}