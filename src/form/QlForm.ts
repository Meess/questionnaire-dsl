import StatefulForm from "./StatefulForm";
import FormNode from "./nodes/FormNode";
import FieldNode from "./nodes/fields/FieldNode";
import FormState from "./state/FormState";
import ComputedFieldNode from "./nodes/fields/ComputedFieldNode";
import QuestionNode from "./nodes/fields/QuestionNode";
import { UnkownDefaultValueError, UnkownFieldError } from "./form_errors";
import FieldVisitor from "./nodes/visitors/FieldVisitor";
import defaultValues from "./defaultValues";
import { VariableScopeVisitor, VariablesMap } from "./type_checking/VariableScopeVisitor";
import FormTraversingVisitor from "./nodes/visitors/FormNodeTraversingVisitor";
import { Maybe } from "../helpers/type_helper";
import StatementCollection from "./collection/StatementCollection";

/**
 * QL Form that combines the AST with a persistent state container.
 */
export default class QlForm implements StatefulForm {
  private rootNode: FormNode;
  private state: FormState;
  private statements: StatementCollection;

  constructor(rootNode: FormNode, state: FormState) {
    this.rootNode = rootNode;
    this.state = state;

    this.statements = FormTraversingVisitor.collectStatements(this.rootNode);
    this.fillDefaultValues();
    this.computeFields();
  }

  /**
   * Compute all readonly fields based on the values that are currently in the state and
   * use previous results to allow references form computed field to computed field.
   */
  computeFields() {
    let state: FormState = this.state;

    this.getComputedFields().forEach((field: ComputedFieldNode) => {
      state = state.set(field.identifier, field.computeAnswer(state));
    });

    this.state = state;
  }

  /**
   * Fill all questions (fields that are not read only) with default values that were defined
   * for the respective field type.
   */
  fillDefaultValues() {
    let state: FormState = this.state;

    this.getQuestions().forEach((field: QuestionNode) => {
      if (state.has(field.identifier)) {
        return;
      }

      if (!defaultValues.has(field.type)) {
        throw UnkownDefaultValueError.make(field.type);
      }

      state = state.set(field.identifier, defaultValues.get(field.type));
    });

    this.state = state;
  }

  /**
   * Get a field by the string identifier. Returns undefined if no field with the identifier exists.
   *
   * @param {string} identifier
   * @returns {FieldNode | any}
   */
  getField(identifier: string): Maybe<FieldNode> | any {
    return this.getFields().find(field => field.identifier === identifier);
  }

  /**
   * Return all fields (computed fields + questions)
   *
   * @returns {FieldNode[]}
   */
  getFields(): FieldNode[] {
    return this.getStatements().getFieldsArray();
  }

  /**
   * Returns all computed fields inside the form (including the inactive / hidden ones)
   * @returns {ComputedFieldNode[]}
   */
  getComputedFields(): ComputedFieldNode[] {
    return this.getStatements().getComputedFieldsArray();
  }

  /**
   * Returns all questions inside the form (including the inactive / hidden ones)
   * @returns {QuestionNode[]}
   */
  getQuestions(): QuestionNode[] {
    return this.getStatements().getQuestionsArray();
  }

  getName(): string {
    return this.rootNode.name;
  }

  getState(): FormState | any {
    return this.state;
  }

  setAnswer(identifier: string, value: any): StatefulForm {
    return this.setState(this.state.set(identifier, value));
  }

  setState(nextState: FormState): StatefulForm {
    return new QlForm(this.rootNode, nextState);
  }

  getRootNode(): FormNode {
    return this.rootNode;
  }

  getAnswer(identifier: string) {
    const field = this.getField(identifier);

    if (!field) {
      throw UnkownFieldError.make(identifier);
    }

    return this.state.get(identifier);
  }

  accept(visitor: FieldVisitor) {
    return this.rootNode.accept(visitor);
  }

  getVariablesMap(): VariablesMap {
    return VariableScopeVisitor.run(this.rootNode).variables;
  }

  getStatements(): StatementCollection {
    if (!this.statements) {
      this.statements = FormTraversingVisitor.collectStatements(this.rootNode);
    }

    return this.statements;
  }
}