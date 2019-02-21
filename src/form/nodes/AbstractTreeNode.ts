import TreeNode from "./TreeNode";
import Locateable from "./location/Locateable";
import NodeVisitor from "./visitors/NodeVisitor";
import NodeLocation from "./location/NodeLocation";

export default abstract class AbstractTreeNode implements TreeNode, Locateable {
  protected location: NodeLocation;

  setLocation(location: NodeLocation): TreeNode {
    this.location = location;
    return this;
  }

  getLocation(): NodeLocation {
    return this.location;
  }

  abstract accept(visitor: NodeVisitor);
}