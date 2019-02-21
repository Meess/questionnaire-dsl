import BinaryOperator from "../BinaryOperator";
import ExpressionVisitor from "../../visitors/ExpressionVisitor";

export default class Multiplication extends BinaryOperator {
  accept(visitor: ExpressionVisitor): any {
    return visitor.visitMultiplication(this);
  }
}