import BinaryOperator from "../BinaryOperator";
import ExpressionVisitor from "../../visitors/ExpressionVisitor";

export default class SmallerThanOrEqual extends BinaryOperator {
  accept(visitor: ExpressionVisitor): any {
    return visitor.visitSmallerThanOrEqual(this);
  }
}