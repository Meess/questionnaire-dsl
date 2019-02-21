import TreeNode from "../TreeNode";
import ExpressionVisitor from "../visitors/ExpressionVisitor";
import NodeLocation from "../location/NodeLocation";

export default abstract class Expression implements TreeNode {
  abstract accept(visitor: ExpressionVisitor): any;

  abstract setLocation(location: NodeLocation): TreeNode;

  abstract getLocation(): NodeLocation;
}
