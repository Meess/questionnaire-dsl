import Equals from "../../form/nodes/expressions/comparisons/Equals";
import BooleanLiteral from "../../form/nodes/literals/BooleanLiteral";
import { evaluate } from "../../form/evaluation/evaluation_functions";
import NotEqual from "../../form/nodes/expressions/comparisons/NotEqual";
import Negation from "../../form/nodes/expressions/boolean_expressions/Negation";
import NumberLiteral from "../../form/nodes/literals/NumberLiteral";
import { FieldType } from "../../form/FieldType";
import { ValuesNotComparableError } from "../../form/form_errors";

it('holds that the same boolean literals are equal', () => {
  const trueIsTrue = new Equals(new BooleanLiteral(true), new BooleanLiteral(true));
  expect(evaluate(trueIsTrue)).toBeTruthy();

  const falseIsFalse = new Equals(new BooleanLiteral(false), new BooleanLiteral(false));
  expect(evaluate(falseIsFalse)).toBeTruthy();

  const falseIsNotFalse = new NotEqual(new BooleanLiteral(false), new BooleanLiteral(false));
  expect(evaluate(falseIsNotFalse)).toBeFalsy();
});

it('holds that different boolean literals are not equal', () => {
  const trueIsFalse = new Equals(new BooleanLiteral(true), new BooleanLiteral(false));
  expect(evaluate(trueIsFalse)).toBeFalsy();

  const falseIsTrue = new Equals(new BooleanLiteral(false), new BooleanLiteral(true));
  expect(evaluate(falseIsTrue)).toBeFalsy();
});

it('holds that true === !false', () => {
  const trueIsEqualToNotFalse = new Equals(new BooleanLiteral(true), new Negation(new BooleanLiteral(false)));
  expect(evaluate(trueIsEqualToNotFalse)).toBeTruthy();
});

it('throws and exception if 1 === true is evaluated', () => {
  expect(() => {
    const oneIsEqualToTrue = new Equals(new BooleanLiteral(true), new NumberLiteral(1));
    evaluate(oneIsEqualToTrue);
  }).toThrow(ValuesNotComparableError);
});