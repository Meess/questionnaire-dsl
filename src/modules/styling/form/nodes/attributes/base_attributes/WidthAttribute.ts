import BaseAttribute from "../BaseAttribute";
import UnitValue  from "../../../values/UnitValue";

export default class WidthAttribute extends BaseAttribute {
  private unitValue: UnitValue;

  constructor(unitValue: string) {
    super();
    this.unitValue = this.makePixelUnitValue(parseInt(unitValue, 10));
  }

  makePixelUnitValue(value: number) {
    return new UnitValue(value, 'px');
  }

  getCssValues(): object {
    return {[this.getName()]: this.getStringValue() };
  }

  getName(): string {
    return "width";
  }

  getStringValue(): string {
    return this.unitValue.toString();
  }
}