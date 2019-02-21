import IntValue from "../../form/values/IntValue";
import { DecimalValue } from "../../form/values/DecimalValue";
import NumericOperation from "../../form/values/NumericOperation";
import NumberValue from "../../form/values/NumberValue";
import { isNumberValue } from "../../form/values/values_helpers";

it('can compare IntValues', () => {
  const expression = new IntValue(5);
  expect(expression).toEqual(new IntValue(5));
  expect(expression).not.toEqual(new IntValue(6));
});

it('can handle edge cases for floating points', () => {
  const leftOne = new DecimalValue(0.3);
  const rightOne = new DecimalValue(0.2);
  const resultOne: NumberValue = NumericOperation.make(leftOne, rightOne).subtract();

  expect(resultOne).toEqual(new DecimalValue(0.1));
  expect(0.3 - 0.2).not.toEqual(0.1);

  const leftTwo = new DecimalValue(0.1);
  const rightTwo = new DecimalValue(0.2);
  const resultTwo: NumberValue = NumericOperation.make(leftTwo, rightTwo).add();

  expect(resultTwo).toEqual(new DecimalValue(0.3));
  expect(0.1 + 0.2).not.toEqual(0.3);
});

it('can compare DecimalValues', () => {
  const expression = new DecimalValue(42);
  expect(expression).toEqual(new DecimalValue(42));
  expect(expression).not.toEqual(new DecimalValue(-5));
});

it('can switches types correctly', () => {
  const left = new IntValue(42);
  const right = new DecimalValue(10);

  expect(NumericOperation.make(left, right).subtract()).toEqual(new DecimalValue(32));
});

it('stays an Integer after division', () => {
  const left = new IntValue(10);
  const right = new IntValue(4);

  expect(NumericOperation.make(left, right).divide()).toEqual(new IntValue(2));
  expect(NumericOperation.make(left, right).divide()).not.toEqual(new DecimalValue(2.5));
});

it('divides Integers and Decimals with decimals', () => {
  const left = new IntValue(10);
  const right = new DecimalValue(4);

  expect(NumericOperation.make(left, right).divide()).toEqual(new DecimalValue(2.5));
  expect(NumericOperation.make(left, right).divide()).not.toEqual(new IntValue(2));
});

it("can detect numeric values", () => {
  expect(isNumberValue(null)).not.toEqual(true);
  expect(isNumberValue({})).not.toEqual(true);
  expect(isNumberValue(new IntValue(0))).toEqual(true);
  expect(isNumberValue(new DecimalValue(31))).toEqual(true);
});