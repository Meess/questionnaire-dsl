import BaseAttribute from "../BaseAttribute";

export default class FontAttribute extends BaseAttribute {
  private value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }

  getCssValues(): object {
    return {fontFamily: this.getStringValue()};
  }

  getName(): string {
    return "font";
  }

  getStringValue(): string {
    return this.value;
  }
}