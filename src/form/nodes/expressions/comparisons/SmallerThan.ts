import BinaryOperator from "../BinaryOperator";
import ExpressionVisitor from "../../visitors/ExpressionVisitor";

export default class SmallerThan extends BinaryOperator {
  accept(visitor: ExpressionVisitor): any {
    return visitor.visitSmallerThan(this);
  }
}