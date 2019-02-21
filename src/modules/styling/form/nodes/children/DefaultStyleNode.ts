import AbstractStyleNode from "../AbstractStyleNode";
import SectionChild from "./SectionChild";
import PageChild from "./PageChild";
import FormChild from "./StyleSheetChild";
import StyleAttribute from "../StyleAttribute";
import StyleNodeVisitor from "../../visitors/StyleNodeVisitor";
import SectionNode from "../containers/SectionNode";
import QuestionStyleNode from "./QuestionStyleNode";

export default class DefaultStyleNode extends AbstractStyleNode implements SectionChild, PageChild, FormChild {
  readonly type: string;
  readonly children: StyleAttribute[];

  constructor(type: string, children: StyleAttribute[]) {
    super();
    this.type = type;
    this.children = children;
  }

  accept(visitor: StyleNodeVisitor) {
    return visitor.visitDefaultStyle(this);
  }

  isSection(): this is SectionNode {
    return false;
  }

  isRendered(): boolean {
    return false;
  }

  isQuestionStyle(): this is QuestionStyleNode {
    return false;
  }
}