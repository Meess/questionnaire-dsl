import BinaryOperator from "../BinaryOperator";
import ExpressionVisitor from "../../visitors/ExpressionVisitor";

export default class Subtraction extends BinaryOperator {
  accept(visitor: ExpressionVisitor): any {
    return visitor.visitSubtraction(this);
  }
}