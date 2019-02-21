import StyleNodeVisitor from "./StyleNodeVisitor";
import DefaultStyle from "../nodes/children/DefaultStyleNode";
import QuestionStyleNode from "../nodes/children/QuestionStyleNode";
import Section from "../nodes/containers/SectionNode";
import Page from "../nodes/containers/PageNode";
import WidgetAttribute from "../nodes/attributes/WidgetAttribute";
import BaseAttribute from "../nodes/attributes/BaseAttribute";
import StyleSheetNode from "../nodes/StyleSheetNode";
import { QuestionPlacedTwiceInLayoutError, UnkownQuestionUsedInLayoutError } from "../style_errors";
import { Maybe } from "../../../../helpers/type_helper";

export default class TypeCheckVisitor implements StyleNodeVisitor {
  private qlVariables: Map<string, any>;
  private allQuestions: Map<string, QuestionStyleNode>;

  constructor(qlVariables: Map<string, any>) {
    this.qlVariables = qlVariables;
    this.allQuestions = new Map();
  }

  visitDefaultStyle(defaultStyle: DefaultStyle): any {
    defaultStyle.children.forEach(child => child.accept(this));
  }

  visitQuestionStyle(question: QuestionStyleNode): any {
    const duplicateQuestion: Maybe<QuestionStyleNode> = this.allQuestions.get(question.identifier);

    if (typeof duplicateQuestion !== 'undefined') {
      throw QuestionPlacedTwiceInLayoutError.make(question, duplicateQuestion);
    }

    this.allQuestions.set(question.identifier, question);

    if (this.qlVariables.has[question.identifier] === false) {
      throw UnkownQuestionUsedInLayoutError.make(question.identifier);
    }

    question.children.forEach(child => child.accept(this));
  }

  visitSection(section: Section): any {
    section.body.forEach(child => child.accept(this));
  }

  visitPageAttribute(page: Page): any {
    page.body.forEach(child => child.accept(this));
  }

  visitWidgetAttribute(widgetAttribute: WidgetAttribute): any {
    widgetAttribute.validate();
  }

  visitBaseAttribute(baseAttribute: BaseAttribute): any {
    return;
  }

  visitStyleSheet(styleSheet: StyleSheetNode): any {
    styleSheet.children.forEach(child => child.accept(this));
  }
}