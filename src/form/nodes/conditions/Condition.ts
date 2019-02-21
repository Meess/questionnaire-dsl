import TreeNode from "../TreeNode";
import Statement from "../Statement";
import NodeVisitor from "../visitors/NodeVisitor";
import Expression from "../expressions/Expression";
import AbstractTreeNode from "../AbstractTreeNode";
import StatementCollection from "../../collection/StatementCollection";

export default abstract class Condition extends AbstractTreeNode implements TreeNode, Statement {
  set otherwise(value: Statement[]) {
    this._otherwise = value;
  }

  set then(value: Statement[]) {
    this._then = value;
  }

  get then(): Statement[] {
    return this._then;
  }

  get otherwise(): Statement[] {
    return this._otherwise;
  }

  get predicate(): Expression {
    return this._predicate;
  }

  private _predicate: Expression;
  private _then: Statement[];
  private _otherwise: Statement[];

  constructor(predicate: Expression, then: Statement[], otherwise?: Statement[]) {
    super();
    this._predicate = predicate;
    this._then = then;
    this._otherwise = (otherwise) ? otherwise : [];
  }

  public getAllStatements() {
    return this.then.concat(this.otherwise);
  }

  abstract accept(visitor: NodeVisitor): any;

  abstract addToCollection(collection: StatementCollection);
}