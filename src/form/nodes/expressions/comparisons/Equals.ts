import BinaryOperator from "../BinaryOperator";
import ExpressionVisitor from "../../visitors/ExpressionVisitor";

export default class Equals extends BinaryOperator {
  accept(visitor: ExpressionVisitor): any {
    return visitor.visitEquals(this);
  }
}