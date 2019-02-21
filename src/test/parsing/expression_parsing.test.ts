import FormNode from "../../form/nodes/FormNode";
import Addition from "../../form/nodes/expressions/arithmetic/Addition";
import ComputedField from "../../form/nodes/fields/ComputedFieldNode";
import NumberLiteral from "../../form/nodes/literals/NumberLiteral";
import { getFirstFormNode, getFirstStatement } from "./parsing_test_helpers";
import BooleanLiteral from "../../form/nodes/literals/BooleanLiteral";
import Or from "../../form/nodes/expressions/boolean_expressions/Or";
import IfCondition from "../../form/nodes/conditions/IfCondition";
import VariableIdentifier from "../../form/nodes/expressions/VariableIdentifier";
import { ValueIsNaNError } from "../../form/form_errors";
import IntValue from "../../form/values/IntValue";
import { DecimalValue } from "../../form/values/DecimalValue";
import { evaluate } from "../../form/evaluation/evaluation_functions";

it("can parse number literals", () => {
  const input = `form taxOfficeExample {
                  "Did you sell a house in 2010?"
                   hasSoldHouse: integer = 
                    (51 + 10)
                   }`;

  const form = getFirstFormNode(input);

  expect(form).toBeInstanceOf(FormNode);
  expect(form.statements.length).toBe(1);
  expect(form.statements[0]).toBeInstanceOf(ComputedField);

  const field: any = form.statements[0];
  expect(field.formula).toBeInstanceOf(Addition);

  const left: NumberLiteral = field.formula.left;
  const right: NumberLiteral = field.formula.right;
  expect(left).toBeInstanceOf(NumberLiteral);
  expect(right).toBeInstanceOf(NumberLiteral);
  expect(left.getValue()).toEqual(new IntValue(51));
  expect(right.getValue()).toEqual(new IntValue(10));
});

it("can parse boolean literals", () => {
  const input = `form taxOfficeExample {
                  "Did you sell a house in 2010?"
                   hasSoldHouse: boolean = 
                    (true || false)
                   }`;

  const form = getFirstFormNode(input);
  const field: any = form.statements[0];
  expect(field).toBeInstanceOf(ComputedField);
  expect(field.formula).toBeInstanceOf(Or);

  const left: BooleanLiteral = field.formula.left;
  const right: BooleanLiteral = field.formula.right;

  expect(left).toBeInstanceOf(BooleanLiteral);
  expect(right).toBeInstanceOf(BooleanLiteral);
  expect(left.getValue()).toBe(true);
  expect(right.getValue()).toBe(false);
});

it("can parse variables that start with reserved keyword", () => {
  const input = `form taxOfficeExample {
                  if(trueVariable){
                      "Did you sell a house in 2010?"
                      trueTwo: boolean 
                  }
                 }`;

  let ifCondition: any = null;

  expect(() => {
    ifCondition = getFirstStatement(input);
  }).not.toThrow(Error);

  expect(ifCondition).not.toBe(null);
  expect(ifCondition).toBeInstanceOf(IfCondition);

  const booleanVariable: VariableIdentifier = ifCondition.predicate;
  expect(booleanVariable).toBeInstanceOf(VariableIdentifier);
  expect(booleanVariable.identifier).toEqual("trueVariable");
});

it("can parse floating numbers", () => {
  const input = `form taxOfficeExample {
                    "Did you sell a house in 2010?"
                      hasSoldHouse: decimal = (2.5)
                 }`;

  let computedField: any = null;

  expect(() => {
    computedField = getFirstStatement(input);
  }).not.toThrow(Error);

  expect(computedField).toBeInstanceOf(ComputedField);

  const numberLiteral: NumberLiteral = computedField.formula;
  expect(numberLiteral).toBeInstanceOf(NumberLiteral);
  expect(numberLiteral.getValue()).toEqual(new DecimalValue(2.5));
});

it("does not allow malformed floating numbers", () => {
  const input = `form taxOfficeExample {
                    "Test float"
                      testFloatOne: decimal = (2.5.5)
                 }`;

  let computedField: any = null;

  expect(() => {
    computedField = getFirstStatement(input);
  }).toThrow(ValueIsNaNError);
});

it("does parse with left associativity", () => {
  const input = `form Example {
                    "Left associativity"
                      testAssociativity: integer = (7 - 4 + 2)
                 }`;

  let computedField: any = null;

  expect(() => {
    computedField = getFirstStatement(input);
  }).not.toThrow(Error);

  expect(evaluate(computedField.formula)).toEqual(new IntValue(5));
});