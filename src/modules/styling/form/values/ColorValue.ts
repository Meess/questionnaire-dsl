const tinycolor = require("tinycolor2");

export default class ColorValue {
  private value: any;

  constructor(stringValue: string) {
    this.value = tinycolor(stringValue);
  }

  isValid() {
    return this.value.isValid();
  }

  toString() {
    return this.value.toString();
  }
}