import StyleNodeVisitor from "./StyleNodeVisitor";
import DefaultStyle from "../nodes/children/DefaultStyleNode";
import Page from "../nodes/containers/PageNode";
import QuestionStyleNode from "../nodes/children/QuestionStyleNode";
import Section from "../nodes/containers/SectionNode";
import WidgetAttribute from "../nodes/attributes/WidgetAttribute";
import BaseAttribute from "../nodes/attributes/BaseAttribute";
import StyleSheetNode from "../nodes/StyleSheetNode";
import StyleTreeNode from "../nodes/StyleTreeNode";

const defaults: StyleFilterOptions = {
  includeDefaults: true,
  includeQuestions: true,
  recursive: false,
};

interface StyleFilterOptions {
  includeDefaults: boolean;
  includeQuestions: boolean;
  recursive: boolean;
}

export default class StyleFilterVisitor implements StyleNodeVisitor {
  private options: StyleFilterOptions;
  private isInitial = true;

  constructor(options: StyleFilterOptions) {
    this.options = Object.assign({}, defaults, options);
  }

  visitDefaultStyle(defaultStyle: DefaultStyle): any {
    return (this.options.includeDefaults) ? [defaultStyle] : [];
  }

  visitQuestionStyle(question: QuestionStyleNode): any {
    return (this.options.includeQuestions) ? [question] : [];
  }

  visitWidgetAttribute(widgetAttribute: WidgetAttribute): any {
    return [];
  }

  visitBaseAttribute(baseAttribute: BaseAttribute): any {
    return [];
  }

  visitSection(section: Section): any {
    return this.visitChildren(section.body);
  }

  visitPageAttribute(page: Page): any {
    return this.visitChildren(page.body);
  }

  visitStyleSheet(styleSheet: StyleSheetNode): any {
    return this.visitChildren(styleSheet.children);
  }

  private visitChildren(children: StyleTreeNode[]) {
    if (this.isInitial === false && this.options.recursive === false) {
      return [];
    }

    this.isInitial = false;
    return children.reduce(
        (filtered: StyleTreeNode[], child: StyleTreeNode) => filtered.concat(child.accept(this)),
        []
    );
  }
}