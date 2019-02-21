import Addition from "../expressions/arithmetic/Addition";
import NumberLiteral from "../literals/NumberLiteral";
import Multiplication from "../expressions/arithmetic/Multiplication";
import Or from "../expressions/boolean_expressions/Or";
import And from "../expressions/boolean_expressions/And";
import Negation from "../expressions/boolean_expressions/Negation";
import Variable from "../expressions/VariableIdentifier";
import Division from "../expressions/arithmetic/Division";
import BooleanLiteral from "../literals/BooleanLiteral";
import Subtraction from "../expressions/arithmetic/Subtraction";
import Equals from "../expressions/comparisons/Equals";
import NotEquals from "../expressions/comparisons/NotEqual";
import LargerThan from "../expressions/comparisons/LargerThan";
import LargerThanOrEqual from "../expressions/comparisons/LargerThanOrEqual";
import SmallerThan from "../expressions/comparisons/SmallerThan";
import SmallerThanOrEqual from "../expressions/comparisons/SmallerThanOrEqual";
import StringLiteral from "../literals/StringLiteral";
import DateLiteral from "../literals/DateLiteral";

/**
 * Visitor that visits every node that extends the Expression class.
 */
interface ExpressionVisitor {
  visitAddition(addition: Addition): any;

  visitNumberLiteral(literal: NumberLiteral): any;

  visitMultiplication(multiplication: Multiplication): any;

  visitOr(or: Or): any;

  visitAnd(and: And): any;

  visitNegation(negation: Negation): any;

  visitVariableIdentifier(variable: Variable): any;

  visitDivision(division: Division): any;

  visitBooleanLiteral(literal: BooleanLiteral): any;

  visitSubtraction(subtraction: Subtraction): any;

  visitEquals(equals: Equals): any;

  visitNotEqual(notEquals: NotEquals): any;

  visitLargerThan(largerThan: LargerThan): any;

  visitLargerThanOrEqual(largerThanOrEqual: LargerThanOrEqual): any;

  visitSmallerThan(smallerThan: SmallerThan): any;

  visitSmallerThanOrEqual(smallerThanOrEqual: SmallerThanOrEqual): any;

  visitStringLiteral(stringLiteral: StringLiteral): any;

  visitDateLiteral(dateLiteral: DateLiteral): any;
}

export default ExpressionVisitor;