import BaseAttribute from "../BaseAttribute";
import UnitValue from "../../../values/UnitValue";

export default class FontSizeAttribute extends BaseAttribute {
  private unitValue: UnitValue;

  constructor(unitValue: string) {
    super();
    this.unitValue = this.makePixelUnitValue(parseInt(unitValue, 10));
  }

  makePixelUnitValue(value: number) {
    return new UnitValue(value, 'px');
  }

  getCssValues(): object {
    return {"fontSize" : this.getStringValue() };
  }

  getName(): string {
    return "fontsize";
  }

  getStringValue(): string {
    return this.unitValue.toString();
  }

}