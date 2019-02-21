import ExpressionVisitor from "../visitors/ExpressionVisitor";
import AbstractLiteral from "./AbstractLiteral";

export default class BooleanLiteral extends AbstractLiteral {
  private value: boolean;

  constructor(value: boolean) {
    super();
    this.value = value;
  }

  accept(visitor: ExpressionVisitor): any {
    return visitor.visitBooleanLiteral(this);
  }

  getValue() {
    return this.value;
  }
}