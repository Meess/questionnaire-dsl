import BinaryOperator from "../BinaryOperator";
import ExpressionVisitor from "../../visitors/ExpressionVisitor";

export default class And extends BinaryOperator {
  accept(visitor: ExpressionVisitor): any {
    return visitor.visitAnd(this);
  }
}