import AbstractTreeNode from "../AbstractTreeNode";
import Expression from "../expressions/Expression";
import ExpressionVisitor from "../visitors/ExpressionVisitor";

export default abstract class AbstractLiteral extends AbstractTreeNode implements Expression {
  abstract accept(visitor: ExpressionVisitor): any;
}