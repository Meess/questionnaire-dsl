export default interface NumberValue {
  type: "NumberValue";

  add(other: NumberValue): NumberValue;

  minus(other: NumberValue): NumberValue;

  multiply(other: NumberValue): NumberValue;

  divide(other: NumberValue): NumberValue;

  increment(): NumberValue;

  decrement(): NumberValue;

  equals(other: NumberValue): boolean;

  smallerThan(other: NumberValue): boolean;

  largerThan(other: NumberValue): boolean;

  getValue(): any;

  getPriority(): number;

  make(value: number): NumberValue;

  convert(other: NumberValue): NumberValue;

  hasHigherPriorityThan(other: NumberValue);

  isSameTypeAs(other: NumberValue): boolean;

  toString(): string;

  toNumber(): number;
}