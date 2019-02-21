import StyleNodeVisitor from "./StyleNodeVisitor";
import DefaultStyle from "../nodes/children/DefaultStyleNode";
import QuestionStyleNode from "../nodes/children/QuestionStyleNode";
import Section from "../nodes/containers/SectionNode";
import Page from "../nodes/containers/PageNode";
import WidgetAttribute from "../nodes/attributes/WidgetAttribute";
import BaseAttribute from "../nodes/attributes/BaseAttribute";
import StyleSheetNode from "../nodes/StyleSheetNode";
import MergedFieldStyle from "../MergedFieldStyle";
import { VariableInformation } from "../../../../form/VariableIntformation";
import StyleTreeNode from "../nodes/StyleTreeNode";
import { getDefaultStyleNodes } from "../../helpers/style_helpers";
import { UnkownQuestionUsedInLayoutError } from "../style_errors";
import { VariablesMap } from "../../../../form/type_checking/VariableScopeVisitor";
import { Maybe } from "../../../../helpers/type_helper";

export default class MergeFieldStylesVisitor implements StyleNodeVisitor {
  private questionStyles: MergedFieldStyle[];
  private qlVariables: Map<string, VariableInformation>;

  constructor(qlVariables: Map<string, VariableInformation>) {
    this.qlVariables = qlVariables;
    this.questionStyles = [];
  }

  getMergedStyles() {
    return this.questionStyles;
  }

  visitDefaultStyle(defaultStyle: DefaultStyle): any {
    return;
  }

  visitQuestionStyle(question: QuestionStyleNode): any {
    const variableInformation: Maybe<VariableInformation> = this.qlVariables.get(question.identifier);

    if (!variableInformation) {
      throw UnkownQuestionUsedInLayoutError.make(question.identifier);
    }

    const mergedStyle: MergedFieldStyle = this.getMergedStyleForQuestion(question, variableInformation);

    this.questionStyles.push(mergedStyle);
    return mergedStyle;
  }

  visitSection(section: Section): any {
    return section.body.forEach(child => child.accept(this));
  }

  visitPageAttribute(page: Page): any {
    return page.body.forEach(child => child.accept(this));
  }

  visitStyleSheet(styleSheet: StyleSheetNode): any {
    return styleSheet.children.forEach(child => child.accept(this));
  }

  static run(styleSheet: StyleSheetNode, qlVariables: VariablesMap): MergedFieldStyle[] {
    const styleVisitor = new MergeFieldStylesVisitor(qlVariables);
    styleSheet.accept(styleVisitor);
    return styleVisitor.getMergedStyles();
  }

  visitWidgetAttribute(widgetAttribute: WidgetAttribute): any {
    return;
  }

  visitBaseAttribute(baseAttribute: BaseAttribute): any {
    return;
  }

  private getMergedStyleForQuestion(question: QuestionStyleNode, variableInformation: VariableInformation) {
    let mergedStyle = new MergedFieldStyle(question.identifier, variableInformation.type);
    let parents: StyleTreeNode[] = question.getParents();

    for (let parent of parents.reverse()) {
      mergedStyle.applyDefaults(getDefaultStyleNodes(parent));
    }

    mergedStyle.applyStyle(question.children);
    return mergedStyle;
  }

}