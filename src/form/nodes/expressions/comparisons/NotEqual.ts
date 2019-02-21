import BinaryOperator from "../BinaryOperator";
import ExpressionVisitor from "../../visitors/ExpressionVisitor";

export default class NotEqual extends BinaryOperator {
  accept(visitor: ExpressionVisitor): any {
    return visitor.visitNotEqual(this);
  }
}