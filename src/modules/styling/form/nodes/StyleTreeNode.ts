import StyleNodeVisitor from "../visitors/StyleNodeVisitor";
import HasStyleParent from "./children/HasStyleParent";
import PageNode from "./containers/PageNode";

export default interface StyleTreeNode extends HasStyleParent {
  accept(visitor: StyleNodeVisitor);

  isPage(): this is PageNode;
}