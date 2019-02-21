import NodeVisitor from "./visitors/NodeVisitor";
import Locateable from "./location/Locateable";

/**
 * Basic behaviour of a syntax tree node that accepts a tree node visitor.
 */
interface TreeNode extends Locateable {
  accept(visitor: NodeVisitor): any;
}

export default TreeNode;