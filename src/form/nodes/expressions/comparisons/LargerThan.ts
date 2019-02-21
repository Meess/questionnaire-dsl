import BinaryOperator from "../BinaryOperator";
import ExpressionVisitor from "../../visitors/ExpressionVisitor";

export default class LargerThan extends BinaryOperator {
  accept(visitor: ExpressionVisitor): any {
    return visitor.visitLargerThan(this);
  }
}