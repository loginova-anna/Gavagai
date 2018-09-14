export class NgramsInfo {
  constructor(
    public text: string,
    public score: number,
    public sentences: string[],
    public show?: boolean
  ) {}
}
