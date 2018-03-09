import { Tonality } from './tonality';
import { UploadText } from './upload-text';

export class ResultItem {
    constructor (
        public item: UploadText,
        public tonality: Tonality[]
    ) {}
}