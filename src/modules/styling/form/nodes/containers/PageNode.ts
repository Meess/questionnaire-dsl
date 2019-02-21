import AbstractStyleNode from "../AbstractStyleNode";
import FormChild from "../children/StyleSheetChild";
import PageChild from "../children/PageChild";
import StyleNodeVisitor from "../../visitors/StyleNodeVisitor";
import SectionNode from "./SectionNode";

export default class PageNode extends AbstractStyleNode implements FormChild {
  readonly body: PageChild[];
  readonly name: string;

  constructor(name: string, body: PageChild[]) {
    super();
    this.name = name;
    this.body = body;
  }

  accept(visitor: StyleNodeVisitor) {
    return visitor.visitPageAttribute(this);
  }

  getFirstLevelSections(): SectionNode[] | any {
    return this.body.filter(child => child.isSection());
  }

  isEqual(otherPage: PageNode) {
    return this.name === otherPage.name;
  }

  isPage(): this is PageNode {
    return true;
  }
}