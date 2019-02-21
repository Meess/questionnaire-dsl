import BinaryOperator from "../BinaryOperator";
import ExpressionVisitor from "../../visitors/ExpressionVisitor";
import Expression from "../Expression";

export default class Division extends BinaryOperator {
  accept(visitor: ExpressionVisitor): any {
    return visitor.visitDivision(this);
  }

  get dividend(): Expression {
    return this.left;
  }

  get divisor(): Expression {
    return this.right;
  }

}