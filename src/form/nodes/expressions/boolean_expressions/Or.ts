import BinaryOperator from "../BinaryOperator";
import ExpressionVisitor from "../../visitors/ExpressionVisitor";

export default class Or extends BinaryOperator {
  accept(visitor: ExpressionVisitor): any {
    return visitor.visitOr(this);
  }
}