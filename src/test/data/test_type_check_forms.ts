import FormNode from "../../form/nodes/FormNode";
import IfCondition from "../../form/nodes/conditions/IfCondition";
import BooleanLiteral from "../../form/nodes/literals/BooleanLiteral";
import QuestionNode from "../../form/nodes/fields/QuestionNode";
import { FieldType } from "../../form/FieldType";
import NumberLiteral from "../../form/nodes/literals/NumberLiteral";

export const validForm = new FormNode("validForm", [
  new IfCondition(new BooleanLiteral(true), [
    new QuestionNode("a", "A", FieldType.Boolean)
  ])
]);

export const numberInIfPredicateForm = new FormNode("numberInIfForm", [
  new IfCondition(new NumberLiteral(4), [
    new QuestionNode("a", "A", FieldType.Boolean)
  ])
]);