import NumberValue from "./NumberValue";

export default abstract class AbstractNumberValue implements NumberValue {
  public readonly type = "NumberValue";

  hasHigherPriorityThan(other: NumberValue) {
    return this.getPriority() > other.getPriority();
  }

  convert(other: NumberValue): NumberValue {
    return this.make(other.getValue());
  }

  isSameTypeAs(other: NumberValue): boolean {
    return this.constructor.name === other.constructor.name;
  }

  abstract add(other: NumberValue);

  abstract minus(other: NumberValue): NumberValue;

  abstract multiply(other: NumberValue): NumberValue;

  abstract divide(other: NumberValue): NumberValue;

  abstract increment(): NumberValue;

  abstract decrement(): NumberValue;

  abstract getValue();

  abstract getPriority(): number;

  abstract make(value: number): NumberValue;

  abstract equals(other: NumberValue): boolean;

  abstract smallerThan(other: NumberValue): boolean;

  abstract largerThan(other: NumberValue): boolean;

  abstract toNumber(): number;
}