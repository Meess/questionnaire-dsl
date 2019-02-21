import Addition from "../../form/nodes/expressions/arithmetic/Addition";
import NumberLiteral from "../../form/nodes/literals/NumberLiteral";
import { evaluate } from "../../form/evaluation/evaluation_functions";
import Division from "../../form/nodes/expressions/arithmetic/Division";
import Multiplication from "../../form/nodes/expressions/arithmetic/Multiplication";
import Equals from "../../form/nodes/expressions/comparisons/Equals";
import NotEqual from "../../form/nodes/expressions/comparisons/NotEqual";
import SmallerThan from "../../form/nodes/expressions/comparisons/SmallerThan";
import LargerThan from "../../form/nodes/expressions/comparisons/LargerThan";
import LargerThanOrEqual from "../../form/nodes/expressions/comparisons/LargerThanOrEqual";
import SmallerThanOrEqual from "../../form/nodes/expressions/comparisons/SmallerThanOrEqual";
import { DivisionByZeroError } from "../../form/form_errors";
import Subtraction from "../../form/nodes/expressions/arithmetic/Subtraction";
import IntValue from "../../form/values/IntValue";
import { DecimalValue } from "../../form/values/DecimalValue";
import { FieldType } from "../../form/FieldType";

it('holds that 1 + 1 === 2', () => {
  const expression = new Addition(NumberLiteral.fromString("1"), NumberLiteral.fromString("1"));
  expect(evaluate(expression)).toEqual(new IntValue(2));

  const expressionDecimal = new Addition(NumberLiteral.fromString("1.0"), NumberLiteral.fromString("1"));
  expect(evaluate(expressionDecimal)).toEqual(new DecimalValue(2));
  expect(evaluate(expressionDecimal)).not.toEqual(new IntValue(2));
});

it('can work with decimals', () => {
  const expression = new Subtraction(new NumberLiteral(0.3), new NumberLiteral(0.2));
  expect(evaluate(expression)).toEqual(new DecimalValue(0.1));
});

it('is not possible to divide by zero', () => {
  expect(() => {
    const divisionByZero = new Division(new NumberLiteral(42), new NumberLiteral(0));
    evaluate(divisionByZero);
  }).toThrow(DivisionByZeroError);
});

it('holds that 1 - 5 === -4', () => {
  const expression = new Addition(NumberLiteral.fromString("1"), NumberLiteral.fromString("-5"));
  expect(evaluate(expression)).toEqual(new IntValue(-4));
});

it('holds that 5.0 / 2 === 2.5', () => {
  const expression = new Division(NumberLiteral.fromString("5.0"), NumberLiteral.fromString("2"));
  expect(evaluate(expression)).toEqual(new DecimalValue(2.5));

  const expressionTwo = new Division(NumberLiteral.fromString("5"), NumberLiteral.fromString("2"));
  expect(evaluate(expressionTwo)).toEqual(new IntValue(2));
});

it('holds that 7 * 6 === 42', () => {
  const left = new NumberLiteral(7, FieldType.Integer);
  const right = new NumberLiteral(6, FieldType.Integer);
  const expression = new Multiplication(left, right);
  expect(evaluate(expression)).toEqual(new IntValue(42));
});

it('holds that 42 === 42.0', () => {
  const expression = new Equals(new NumberLiteral(42), new NumberLiteral(42));
  expect(evaluate(expression)).toBe(true);

  const expression2 = new Equals(new NumberLiteral(42, FieldType.Integer), new NumberLiteral(42, FieldType.Decimal));
  expect(evaluate(expression2)).toBe(true);
});

it('holds that 41 !== 42', () => {
  const equalsExpression = new Equals(new NumberLiteral(41), new NumberLiteral(42));
  expect(evaluate(equalsExpression)).toBe(false);

  const notEqualsExpression = new NotEqual(new NumberLiteral(41), new NumberLiteral(42));
  expect(evaluate(notEqualsExpression)).toBe(true);
});

it('holds that 4 < 7', () => {
  const fourSmallerSeven = new SmallerThan(new NumberLiteral(4), new NumberLiteral(7));
  expect(evaluate(fourSmallerSeven)).toBe(true);

  const sevenSmallerFour = new SmallerThan(new NumberLiteral(7), new NumberLiteral(4));
  expect(evaluate(sevenSmallerFour)).toBe(false);
});

it('does not hold that 4 < 4', () => {
  const fourSmallerSeven = new SmallerThan(new NumberLiteral(4), new NumberLiteral(4));
  expect(evaluate(fourSmallerSeven)).toBe(false);
});

it('holds that 7 > 4', () => {
  const sevenLargerFour = new LargerThan(new NumberLiteral(7), new NumberLiteral(4));
  expect(evaluate(sevenLargerFour)).toBe(true);

  const fourLargerSeven = new LargerThan(new NumberLiteral(4), new NumberLiteral(7));
  expect(evaluate(fourLargerSeven)).toBe(false);
});

it('holds that 7 >= 4', () => {
  const sevenLargerOrEqualFour = new LargerThanOrEqual(new NumberLiteral(7), new NumberLiteral(4));
  expect(evaluate(sevenLargerOrEqualFour)).toBe(true);

  const fourLargerOrEqualSeven = new LargerThanOrEqual(new NumberLiteral(4), new NumberLiteral(7));
  expect(evaluate(fourLargerOrEqualSeven)).toBe(false);
});

it('holds that 7 >= 7 and 7 <= 7', () => {
  const sevenLargerOrEqualSeven = new LargerThanOrEqual(new NumberLiteral(7), new NumberLiteral(7));
  expect(evaluate(sevenLargerOrEqualSeven)).toBe(true);

  const sevenSmallerOrEqualSeven = new SmallerThanOrEqual(new NumberLiteral(7), new NumberLiteral(7));
  expect(evaluate(sevenSmallerOrEqualSeven)).toBe(true);
});

it('holds that 4 <= 7', () => {
  const fourSmallerOrEqualSeven = new SmallerThanOrEqual(new NumberLiteral(4), new NumberLiteral(7));
  expect(evaluate(fourSmallerOrEqualSeven)).toBe(true);

  const sevenSmallerOrEqualFour = new SmallerThanOrEqual(new NumberLiteral(7), new NumberLiteral(4));
  expect(evaluate(sevenSmallerOrEqualFour)).toBe(false);
});