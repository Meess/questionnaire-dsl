import BaseAttribute from "../BaseAttribute";
import ColorValue from "../../../values/ColorValue";
import { InvalidColorError } from "../../../style_errors";

export default class ColorAttribute extends BaseAttribute {
  private color: ColorValue;

  constructor(color: string) {
    super();
    this.color = this.parseColor(color);
  }

  parseColor(value: string): ColorValue {
    const color = new ColorValue(value);

    if (!color.isValid()) {
      throw InvalidColorError.make(value);
    }

    return color;
  }

  getCssValues(): object {
    return {
      [this.getName()]: this.getStringValue(),
    };
  }

  getName(): string {
    return "color";
  }

  getStringValue(): string {
    return this.color.toString();
  }

}