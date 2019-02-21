import StatefulForm from "../../../form/StatefulForm";
import PagedFormState from "./PagedFormState";
import StyleSheetNode from "./nodes/StyleSheetNode";
import FieldVisitor from "../../../form/nodes/visitors/FieldVisitor";
import PageNode from "./nodes/containers/PageNode";
import FormNode from "../../../form/nodes/FormNode";
import FormState from "../../../form/state/FormState";
import MergedFieldStyle from "./MergedFieldStyle";
import MergeFieldStylesVisitor from "./visitors/MergeFieldStylesVisitor";
import { VariablesMap } from "../../../form/type_checking/VariableScopeVisitor";
import QuestionStyleNode from "./nodes/children/QuestionStyleNode";
import StyledField from "./StyledField";
import FieldNode from "../../../form/nodes/fields/FieldNode";
import { Maybe } from "../../../helpers/type_helper";
import { getQuestionStyleNodes } from "../helpers/style_helpers";

/**
 * QLS Form that combines a basic QL form with styling and layout information
 * retrieved from the QLS source.
 */
export default class QlsForm implements StatefulForm {
  private baseForm: StatefulForm;
  private styleSheetNode: StyleSheetNode;
  private mergedStyles: MergedFieldStyle[];
  private questionStyles: QuestionStyleNode[];

  constructor(baseForm: StatefulForm, styleSheetNode: StyleSheetNode) {
    this.styleSheetNode = styleSheetNode;
    this.baseForm = baseForm;
    this.mergedStyles = MergeFieldStylesVisitor.run(this.styleSheetNode, this.getVariablesMap());
    this.questionStyles = getQuestionStyleNodes(this.styleSheetNode, true);
  }

  getName(): string {
    return this.baseForm.getName();
  }

  getFields(): FieldNode[] {
    return this.baseForm.getFields();
  }

  getState(): PagedFormState {
    return this.baseForm.getState();
  }

  setAnswer(identifier: string, value: any): StatefulForm {
    const newBaseForm = this.baseForm.setAnswer(identifier, value);
    return new QlsForm(newBaseForm, this.styleSheetNode);
  }

  setState(nextState: FormState): StatefulForm {
    const newBaseForm = this.baseForm.setState(nextState);
    return new QlsForm(newBaseForm, this.styleSheetNode);
  }

  // noinspection JSUnusedGlobalSymbols
  setActivePage(nextPage: PageNode): StatefulForm {
    const nextState = this.getState().setActivePageName(nextPage.name);
    return this.setState(nextState);
  }

  getRootNode(): FormNode {
    return this.baseForm.getRootNode();
  }

  getAnswer(identifier: string): any {
    return this.baseForm.getAnswer(identifier);
  }

  accept(visitor: FieldVisitor): any {
    return this.baseForm.accept(visitor);
  }

  getActivePage(): Maybe<PageNode> {
    const activePageName = this.getState().getActivePageName();

    const activePage: Maybe<PageNode> = this.getPages().find(
        page => typeof activePageName !== 'undefined' && page.name === activePageName
    );

    if (!activePageName) {
      return this.styleSheetNode.getFirstPage();
    }

    return activePage;
  }

  getPages(): PageNode[] {
    return this.styleSheetNode.getPages();
  }

  getField(identifier: string): Maybe<FieldNode> {
    return this.baseForm.getField(identifier);
  }

  getStyledField(identifier: string): Maybe<StyledField> {
    const field = this.getField(identifier);

    if (!field) {
      return undefined;
    }

    return StyledField.makeFromCollections(field, this.getMergedStyles(), this.getQuestionStyleNodes());
  }

  getVariablesMap(): VariablesMap {
    return this.baseForm.getVariablesMap();
  }

  private getMergedStyles(): MergedFieldStyle[] {
    return this.mergedStyles;
  }

  private getQuestionStyleNodes(): QuestionStyleNode[] {
    return this.questionStyles;
  }
}