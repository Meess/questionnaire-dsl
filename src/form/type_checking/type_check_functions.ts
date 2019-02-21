import TreeNode from "../nodes/TreeNode";
import { VariablesInformation } from "../VariableIntformation";
import { TypeCheckVisitor } from "./TypeCheckVisitor";

export const typeCheck = (node: TreeNode, variables?: VariablesInformation) => {
  const visitor = new TypeCheckVisitor(variables);
  return node.accept(visitor);
};