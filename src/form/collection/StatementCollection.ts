import GenericCollection from "./GenericCollection";
import ComputedFieldNode from "../nodes/fields/ComputedFieldNode";
import QuestionNode from "../nodes/fields/QuestionNode";
import IfCondition from "../nodes/conditions/IfCondition";
import Statement from "../nodes/Statement";
import FieldNode from "../nodes/fields/FieldNode";

export default class StatementCollection {
  private all: GenericCollection<Statement> = new GenericCollection([]);
  private fields: GenericCollection<FieldNode> = new GenericCollection([]);
  private computedFields: GenericCollection<ComputedFieldNode> = new GenericCollection([]);
  private questions: GenericCollection<QuestionNode> = new GenericCollection([]);
  private ifConditions: GenericCollection<IfCondition> = new GenericCollection([]);

  addComputedField(computedField: ComputedFieldNode) {
    this.all.add(computedField);
    this.fields.add(computedField);
    this.computedFields.add(computedField);
  }

  addQuestion(question: QuestionNode) {
    this.all.add(question);
    this.fields.add(question);
    this.questions.add(question);
  }

  addIfCondition(ifCondition: IfCondition) {
    this.all.add(ifCondition);
    this.ifConditions.add(ifCondition);
  }

  toArray(): Statement[] {
    return this.all.toArray();
  }

  getFieldsArray(): FieldNode[] {
    return this.fields.toArray();
  }

  getComputedFieldsArray(): ComputedFieldNode[] {
    return this.computedFields.toArray();
  }

  getQuestionsArray(): QuestionNode[] {
    return this.questions.toArray();
  }

  getIfConditionsArray(): IfCondition[] {
    return this.ifConditions.toArray();
  }
}