import DefaultStyle from "../nodes/children/DefaultStyleNode";
import Section from "../nodes/containers/SectionNode";
import Page from "../nodes/containers/PageNode";
import WidgetAttribute from "../nodes/attributes/WidgetAttribute";
import BaseAttribute from "../nodes/attributes/BaseAttribute";
import StyleSheetNode from "../nodes/StyleSheetNode";
import QuestionStyleNode from "../nodes/children/QuestionStyleNode";

export default interface StyleNodeVisitor {
  visitDefaultStyle(defaultStyle: DefaultStyle): any;

  visitQuestionStyle(question: QuestionStyleNode): any;

  visitSection(section: Section): any;

  visitPageAttribute(page: Page): any;

  visitWidgetAttribute(widgetAttribute: WidgetAttribute): any;

  visitBaseAttribute(baseAttribute: BaseAttribute): any;

  visitStyleSheet(styleSheet: StyleSheetNode): any;
}