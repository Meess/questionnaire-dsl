import ExpressionVisitor from "../visitors/ExpressionVisitor";
import Expression from "./Expression";
import AbstractTreeNode from "../AbstractTreeNode";

export default class VariableIdentifier extends AbstractTreeNode implements Expression {
  readonly identifier: string;

  /**
   * Created a variable identifier that occurs inside a formula expression.
   * @param {string} identifier
   */
  constructor(identifier: string) {
    super();
    this.identifier = identifier;
  }

  accept(visitor: ExpressionVisitor): any {
    return visitor.visitVariableIdentifier(this);
  }
}