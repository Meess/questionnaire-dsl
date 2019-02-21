export default class SourceText {
  private input: string;

  constructor(input: string) {
    this.input = input;
  }

  isEmpty(): boolean {
    return this.input.trim().length === 0;
  }

  toString() {
    return this.input;
  }

  static makeEmpty(): SourceText {
    return new SourceText("");
  }
}