import ExpressionVisitor from "../../visitors/ExpressionVisitor";
import UnaryOperator from "../UnaryOperator";

export default class Negation extends UnaryOperator {
  accept(visitor: ExpressionVisitor): any {
    return visitor.visitNegation(this);
  }
}