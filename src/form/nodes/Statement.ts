import TreeNode from "./TreeNode";
import FieldVisitor from "./visitors/FieldVisitor";
import StatementCollection from "../collection/StatementCollection";

/**
 * Statement interface that makes up a collection of Fields or Condition inside a Form or a
 * Condition Block.
 */
interface Statement extends TreeNode {
  accept(visitor: FieldVisitor): any;

  addToCollection(collection: StatementCollection): void;
}

export default Statement;