import { UploadText } from './upload-text';

export class UploadData {
  constructor(
    public texts: UploadText[],
    public language: string,
    public tones: string[],
    public includeSentences: boolean
  ) {

  }
}
