import Expression from "./Expression";
import TreeNode from "../TreeNode";
import ExpressionVisitor from "../visitors/ExpressionVisitor";
import AbstractTreeNode from "../AbstractTreeNode";

export default abstract class UnaryOperator extends AbstractTreeNode implements TreeNode {
  get expression(): Expression {
    return this._expression;
  }

  private _expression: Expression;

  /**
   * Creates a unary operator that has one child expression.
   * Used to extract common behaviour of a negation or similar expressions.
   * @param {Expression} expression
   */
  constructor(expression: Expression) {
    super();
    this._expression = expression;
  }

  abstract accept(visitor: ExpressionVisitor): any;
}