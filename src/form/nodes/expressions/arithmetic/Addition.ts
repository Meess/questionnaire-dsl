import BinaryOperator from "../BinaryOperator";
import ExpressionVisitor from "../../visitors/ExpressionVisitor";

export default class Addition extends BinaryOperator {
  accept(visitor: ExpressionVisitor): any {
    return visitor.visitAddition(this);
  }
}