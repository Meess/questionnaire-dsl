import Addition from "../nodes/expressions/arithmetic/Addition";
import NumberLiteral from "../nodes/literals/NumberLiteral";
import Multiplication from "../nodes/expressions/arithmetic/Multiplication";
import ExpressionVisitor from "../nodes/visitors/ExpressionVisitor";
import Negation from "../nodes/expressions/boolean_expressions/Negation";
import And from "../nodes/expressions/boolean_expressions/And";
import Or from "../nodes/expressions/boolean_expressions/Or";
import {
  assertBoolean, assertComparable, assertSameType, assertString,
  assertValidDivision, assertNumberValue, assertDate,
} from "../type_checking/type_assertions";
import VariableIdentifier from "../nodes/expressions/VariableIdentifier";
import { UnkownVariableIdentifierError } from "../form_errors";
import BooleanLiteral from "../nodes/literals/BooleanLiteral";
import Division from "../nodes/expressions/arithmetic/Division";
import Subtraction from "../nodes/expressions/arithmetic/Subtraction";
import Equals from "../nodes/expressions/comparisons/Equals";
import NotEquals from "../nodes/expressions/comparisons/NotEqual";
import BinaryOperator from "../nodes/expressions/BinaryOperator";
import LargerThan from "../nodes/expressions/comparisons/LargerThan";
import LargerThanOrEqual from "../nodes/expressions/comparisons/LargerThanOrEqual";
import SmallerThan from "../nodes/expressions/comparisons/SmallerThan";
import SmallerThanOrEqual from "../nodes/expressions/comparisons/SmallerThanOrEqual";
import StringLiteral from "../nodes/literals/StringLiteral";
import DateLiteral from "../nodes/literals/DateLiteral";
import FormState from "../state/FormState";
import Decimal from "decimal.js/decimal";
import NumberValue from "../values/NumberValue";
import NumericOperation from "../values/NumericOperation";
import { isNumberValue } from "../values/values_helpers";
import { Maybe } from "../../helpers/type_helper";

/**
 * The evaluation visitor travels through an expression and calculates
 * a numeric result after performing arithmetic operations or a boolean result
 * for a logical statement.
 *
 */
export default class EvaluationVisitor implements ExpressionVisitor {
  private state: Maybe<FormState>;

  constructor(state?: FormState) {
    this.state = state;
  }

  /**
   * Visit the variable identifier and return its value
   *
   * @todo Construct evaluation visitor with store for variable values to evaluate identifiers.
   * @param {VariableIdentifier} variable
   */
  visitVariableIdentifier(variable: VariableIdentifier) {
    if (!this.state || !this.state.has(variable.identifier)) {
      throw UnkownVariableIdentifierError.make(variable);
    }

    return this.state.get(variable.identifier);
  }

  /**
   * Visit a negation node and return the opposite of the enclosed expression.
   * @param {Negation} negation
   * @returns {any}
   */
  visitNegation(negation: Negation): any {
    return assertBoolean(negation.expression.accept(this)) === false;
  }

  /**
   * Ends a .accept chain by returning a the boolean value of a boolean literal.
   * @param {BooleanLiteral} literal
   * @returns {any}
   */
  visitBooleanLiteral(literal: BooleanLiteral): any {
    return assertBoolean(literal.getValue());
  }

  /**
   * Evaluates an And node by checking if the left and the right side are true
   * @param {And} and
   * @returns {any}
   */
  visitAnd(and: And): any {
    return assertBoolean(and.left.accept(this)) && assertBoolean(and.right.accept(this));
  }

  /**
   * Evaluates an Or node by checking if the left or the right side are true
   * @param {Or} or
   * @returns {any}
   */
  visitOr(or: Or): any {
    return assertBoolean(or.left.accept(this)) || assertBoolean(or.right.accept(this));
  }

  /**
   * Multiplies the evaluated left side of the binary operation with the value behind the right side.
   * @param {Multiplication} multiplication
   * @returns {any}
   */
  visitMultiplication(multiplication: Multiplication): NumberValue {
    const left: NumberValue = assertNumberValue(multiplication.left.accept(this));
    const right: NumberValue = assertNumberValue(multiplication.right.accept(this));

    return NumericOperation.make(left, right).multiply();
  }

  /**
   * Evaluates a division node after evaluation the left and right side and checking
   * if the division is valid.
   * @param {Division} division
   * @returns {any}
   */
  visitDivision(division: Division): NumberValue {
    const dividendValue: NumberValue = assertNumberValue(division.dividend.accept(this));
    const divisorValue: NumberValue = assertNumberValue(division.divisor.accept(this));

    assertValidDivision(dividendValue, divisorValue);

    return NumericOperation.make(dividendValue, divisorValue).divide();
  }

  /**
   * Sums up the evaluated left side of the binary operation to the value behind the right side.
   * @param {Addition} addition
   * @returns {any}
   */
  visitAddition(addition: Addition): NumberValue {
    const left: NumberValue = assertNumberValue(addition.left.accept(this));
    const right: NumberValue = assertNumberValue(addition.right.accept(this));

    return NumericOperation.make(left, right).add();
  }

  visitSubtraction(subtraction: Subtraction): NumberValue {
    const left: NumberValue = assertNumberValue(subtraction.left.accept(this));
    const right: NumberValue = assertNumberValue(subtraction.right.accept(this));

    return NumericOperation.make(left, right).subtract();
  }

  /**
   * Evaluate a Equals node by comparing the values behind the left and the right side.
   * @param {Equals} equals
   * @returns {boolean}
   */
  visitEquals(equals: Equals) {
    const {leftValue, rightValue} = this.assertSidesAreComparable(equals);

    if (isNumberValue(leftValue) && isNumberValue(rightValue)) {
      return NumericOperation.make(leftValue, rightValue).equals();
    }

    return leftValue === rightValue;
  }

  visitLargerThan(largerThan: LargerThan): any {
    const {leftValue, rightValue} = this.assertSidesAreComparable(largerThan);

    if (isNumberValue(leftValue) && isNumberValue(rightValue)) {
      return NumericOperation.make(leftValue, rightValue).largerThan();
    }

    return leftValue > rightValue;
  }

  visitLargerThanOrEqual(largerThanOrEqual: LargerThanOrEqual): any {
    const {leftValue, rightValue} = this.assertSidesAreComparable(largerThanOrEqual);

    if (isNumberValue(leftValue) && isNumberValue(rightValue)) {
      return NumericOperation.make(leftValue, rightValue).largerThanOrEqual();
    }

    return leftValue >= rightValue;
  }

  visitSmallerThan(smallerThan: SmallerThan): any {
    const {leftValue, rightValue} = this.assertSidesAreComparable(smallerThan);

    if (isNumberValue(leftValue) && isNumberValue(rightValue)) {
      return NumericOperation.make(leftValue, rightValue).smallerThan();
    }

    return leftValue < rightValue;
  }

  visitSmallerThanOrEqual(smallerThanOrEqual: SmallerThanOrEqual): any {
    const {leftValue, rightValue} = this.assertSidesAreComparable(smallerThanOrEqual);

    if (isNumberValue(leftValue) && isNumberValue(rightValue)) {
      return NumericOperation.make(leftValue, rightValue).smallerThanOrEqual();
    }

    return leftValue <= rightValue;
  }

  visitNotEqual(notEquals: NotEquals): any {
    const {leftValue, rightValue} = this.assertSidesAreComparable(notEquals);

    if (isNumberValue(leftValue) && isNumberValue(rightValue)) {
      return NumericOperation.make(leftValue, rightValue).notEqual();
    }

    return leftValue !== rightValue;
  }

  /**
   * Ends a .accept chain by returning a the number value of a number literal.
   * @param {NumberLiteral} literal
   * @returns {any}
   */
  visitNumberLiteral(literal: NumberLiteral): any {
    return assertNumberValue(literal.getValue());
  }

  /**
   * Ends a .accept chain by returning a the string value of a string literal.
   * @param {StringLiteral} literal
   * @returns {any}
   */
  visitStringLiteral(literal: StringLiteral): any {
    return assertString(literal.getValue());
  }

  /**
   * Ends a .accept chain by returning a the string value of a string literal.
   * @param {DateLiteral} literal
   * @returns {any}
   */
  visitDateLiteral(literal: DateLiteral): any {
    return assertDate(literal.getValue());
  }

  /**
   * Test if both sides of a binary operator are comparable after visiting and evaluating the
   * left and right side.
   *
   * @param {BinaryOperator} operator
   * @returns {{leftValue: any; rightValue: any}}
   */
  private assertSidesAreComparable(operator: BinaryOperator) {
    const leftValue: any = operator.left.accept(this);
    const rightValue: any = operator.right.accept(this);

    assertSameType(leftValue, rightValue, operator);
    assertComparable(leftValue, operator);
    return {leftValue, rightValue};
  }
}