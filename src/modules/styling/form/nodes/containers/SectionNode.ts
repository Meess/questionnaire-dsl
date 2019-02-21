import AbstractStyleNode from "../AbstractStyleNode";
import PageChild from "../children/PageChild";
import SectionChild from "../children/SectionChild";
import StyleNodeVisitor from "../../visitors/StyleNodeVisitor";
import QuestionStyleNode from "../children/QuestionStyleNode";

export default class SectionNode extends AbstractStyleNode implements PageChild, SectionChild {
  readonly body: SectionChild[];
  readonly name: string;

  constructor(name: string, body: SectionChild[]) {
    super();
    this.name = name;
    this.body = body;
  }

  accept(visitor: StyleNodeVisitor) {
    return visitor.visitSection(this);
  }

  isSection(): this is SectionNode {
    return true;
  }

  isRendered(): boolean {
    return true;
  }

  isQuestionStyle(): this is QuestionStyleNode {
    return false;
  }
}