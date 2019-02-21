export default class UnitValue {
  private value: number;
  private unit: string;

  constructor(value: number, unit: string) {
    this.value = value;
    this.unit = unit;
  }

  toString(): string {
    return `${this.value}${this.unit}`;
  }
}