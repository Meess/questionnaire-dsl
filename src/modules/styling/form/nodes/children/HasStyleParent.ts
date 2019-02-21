import StyleTreeNode from "../StyleTreeNode";

export default interface HasStyleParent {
  setParent(parent: StyleTreeNode): void;

  getParent(): StyleTreeNode | null;

  getParents(): StyleTreeNode[];

  getNearestParent(test: (node: StyleTreeNode) => boolean): StyleTreeNode | undefined | any;
}