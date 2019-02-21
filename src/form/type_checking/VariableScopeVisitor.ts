import FieldVisitor from "../nodes/visitors/FieldVisitor";
import ComputedField from "../nodes/fields/ComputedFieldNode";
import QuestionNode from "../nodes/fields/QuestionNode";
import IfCondition from "../nodes/conditions/IfCondition";
import FormNode from "../nodes/FormNode";
import { VariableScopeStack } from "./VariableScopeStack";
import FieldNode from "../nodes/fields/FieldNode";
import { FieldAlreadyDeclaredError, VariableNotInScopeError } from "../form_errors";
import { getUsedVariableIdentifiers } from "../../helpers/form_helpers";
import Expression from "../nodes/expressions/Expression";
import { getVariableInformation, VariableInformation } from "../VariableIntformation";
import FieldNodeDecorator from "../nodes/fields/FieldNodeDecorator";

export interface VariableScopeResult {
  variables: VariablesMap;
}

export type VariablesMap = Map<string, VariableInformation>;

export class VariableScopeVisitor implements FieldVisitor {
  private _stack: VariableScopeStack;

  constructor() {
    this._stack = new VariableScopeStack();
  }

  visitQuestion(question: QuestionNode): any {
    this.addToStack(question);
  }

  visitComputedField(computedField: ComputedField): any {
    this.containsAllVariablesOrFail(computedField.formula);

    this.addToStack(computedField);
  }

  visitFieldDecorator(fieldDecorator: FieldNodeDecorator) {
    return fieldDecorator.getBaseField().accept(this);
  }

  visitIfCondition(ifCondition: IfCondition): any {
    this.containsAllVariablesOrFail(ifCondition.predicate);

    this._stack.moveDown();
    ifCondition.getAllStatements().forEach(statement => statement.accept(this));
    this._stack.moveUp();
  }

  visitForm(form: FormNode): any {
    this._stack.moveDown();
    form.statements.forEach(statement => statement.accept(this));
    this._stack.moveUp();
  }

  public getDeclaredVariables(): VariablesMap {
    return this._stack.getDeclaredVariables();
  }

  static run(form: FormNode): VariableScopeResult {
    const visitor = new VariableScopeVisitor();
    visitor.visitForm(form);

    return {
      variables: visitor.getDeclaredVariables()
    };
  }

  private containsAllVariablesOrFail(expression: Expression) {
    const variables = getUsedVariableIdentifiers(expression);

    variables.forEach(identifier => {
      if (!this._stack.contains(identifier)) {
        throw VariableNotInScopeError.make(expression, identifier);
      }
    });
  }

  /**
   * Add variable to current level and history of declared variables in
   * variable stack.
   *
   * @param {FieldNode} field
   */
  private addToStack(field: FieldNode) {
    if (this._stack.wasAlreadyDeclared(field.identifier)) {
      throw (FieldAlreadyDeclaredError.make(field));
    }

    this._stack.add(getVariableInformation(field));
  }
}
