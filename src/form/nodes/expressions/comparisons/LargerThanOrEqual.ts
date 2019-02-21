import BinaryOperator from "../BinaryOperator";
import ExpressionVisitor from "../../visitors/ExpressionVisitor";

export default class LargerThanOrEqual extends BinaryOperator {
  accept(visitor: ExpressionVisitor): any {
    return visitor.visitLargerThanOrEqual(this);
  }
}