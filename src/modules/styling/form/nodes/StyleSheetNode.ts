import AbstractStyleNode from "./AbstractStyleNode";
import StyleSheetChild from "./children/StyleSheetChild";
import StyleNodeVisitor from "../visitors/StyleNodeVisitor";
import Page from "./containers/PageNode";
import { StyleSheetNeedsAtLeasOnePageError } from "../style_errors";

export default class StyleSheetNode extends AbstractStyleNode {
  readonly name: string;
  readonly children: StyleSheetChild[];

  constructor(name: string, children: StyleSheetChild[]) {
    super();
    this.name = name;
    this.children = children;

    this.validate();
  }

  validate() {
    if (this.getPages().length === 0) {
      throw StyleSheetNeedsAtLeasOnePageError.make(this);
    }
  }

  accept(visitor: StyleNodeVisitor): any {
    return visitor.visitStyleSheet(this);
  }

  getPages(): Page[] | any {
    return this.children.filter(child => child.isPage());
  }

  getFirstPage() {
    return this.getPages()[0];
  }
}
