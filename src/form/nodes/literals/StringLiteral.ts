import ExpressionVisitor from "../visitors/ExpressionVisitor";
import AbstractLiteral from "./AbstractLiteral";

export default class StringLiteral extends AbstractLiteral {
  private value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }

  accept(visitor: ExpressionVisitor): any {
    return visitor.visitStringLiteral(this);
  }

  getValue(): string {
    return this.value;
  }
}