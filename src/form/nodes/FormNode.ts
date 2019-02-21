import Statement from "./Statement";
import TreeNode from "./TreeNode";
import NodeVisitor from "./visitors/NodeVisitor";
import FieldVisitor from "./visitors/FieldVisitor";
import AbstractTreeNode from "./AbstractTreeNode";

export default class FormNode extends AbstractTreeNode implements TreeNode {
  private _name: string;

  private _statements: Statement[];

  /**
   * The root node of a form which contains statements (fields or conditions)
   * and is given a name.
   * @param {string} name
   * @param {Statement[]} statements
   */
  constructor(name: string, statements: Statement[]) {
    super();
    this._name = name;
    this._statements = statements;
  }

  /**
   * List of fields and conditions that implement the Statement interface.
   * @returns {Statement[]}
   */
  get statements(): Statement[] {
    return this._statements;
  }

  /**
   * Name of the form
   * @returns {string}
   */
  get name(): string {
    return this._name;
  }

  /**
   * Accept a node visitor for calculations or other actions.
   * @param {NodeVisitor} visitor
   * @returns {any}
   */
  accept(visitor: FieldVisitor): any {
    return visitor.visitForm(this);
  }
}