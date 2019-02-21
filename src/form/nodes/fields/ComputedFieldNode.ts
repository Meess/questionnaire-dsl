import { FieldType } from "../../FieldType";
import Field from "./FieldNode";
import Expression from "../expressions/Expression";
import FormState from "../../state/FormState";
import { canBeEvaluated, evaluate } from "../../evaluation/evaluation_functions";
import FieldVisitor from "../visitors/FieldVisitor";
import AbstractTreeNode from "../AbstractTreeNode";
import StatementCollection from "../../collection/StatementCollection";

export default class ComputedFieldNode extends AbstractTreeNode implements Field {
  readonly label: string;
  readonly identifier: string;
  readonly type: FieldType;
  readonly formula: Expression;

  /**
   * Creates a computed field that will be rendered as a readonly label that
   * displays the result of the provided formula.
   *
   * @param {string} identifier
   * @param {string} label
   * @param {FieldType} type
   * @param {Expression} formula
   */
  constructor(identifier: string, label: string, type: FieldType, formula: Expression) {
    super();
    this.label = label;
    this.identifier = identifier;
    this.type = type;
    this.formula = formula;
  }

  accept(visitor: FieldVisitor): any {
    return visitor.visitComputedField(this);
  }

  isReadOnly(): boolean {
    return true;
  }

  computeAnswer(state: FormState) {
    if (!canBeEvaluated(this.formula, state)) {
      return null;
    }

    return evaluate(this.formula, state);
  }

  addToCollection(collection: StatementCollection): void {
    collection.addComputedField(this);
  }
}