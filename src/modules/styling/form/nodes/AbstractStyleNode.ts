import StyleTreeNode from "./StyleTreeNode";
import StyleNodeVisitor from "../visitors/StyleNodeVisitor";
import PageNode from "./containers/PageNode";

export default abstract class AbstractStyleNode implements StyleTreeNode {
  private parent: StyleTreeNode;

  getParent(): StyleTreeNode | null {
    return this.parent;
  }

  getParents(): StyleTreeNode[] {
    const parents: StyleTreeNode[] = [];
    let parent: StyleTreeNode | null = this.parent;

    while (parent !== null) {
      if (parent === undefined) {
        break;
      }

      parents.push(parent);
      parent = parent.getParent();
    }

    return parents;
  }

  setParent(parent: StyleTreeNode): void {
    this.parent = parent;
  }

  getNearestParent(test: (node: StyleTreeNode) => boolean): StyleTreeNode | undefined | any {
    return this.getParents().reverse().find(test);
  }

  isPage(): this is PageNode {
    return false;
  }

  abstract accept(visitor: StyleNodeVisitor);
}