import FormNode from "../../form/nodes/FormNode";
import IfCondition from "../../form/nodes/conditions/IfCondition";
import BooleanLiteral from "../../form/nodes/literals/BooleanLiteral";
import QuestionNode from "../../form/nodes/fields/QuestionNode";
import { FieldType } from "../../form/FieldType";
import VariableIdentifier from "../../form/nodes/expressions/VariableIdentifier";
import ComputedField from "../../form/nodes/fields/ComputedFieldNode";

export const nestedForm = new FormNode("nestedForm", [
  new IfCondition(new BooleanLiteral(true), [
    new QuestionNode("a", "A", FieldType.Boolean),
    new QuestionNode("b", "B", FieldType.Boolean),
    new IfCondition(new VariableIdentifier("a"), [
      new QuestionNode("c", "C", FieldType.Boolean),
      new QuestionNode("d", "D", FieldType.Boolean),
      new IfCondition(new VariableIdentifier("c"), [
        new QuestionNode("x", "X", FieldType.Boolean),
        new QuestionNode("y", "Y", FieldType.Boolean)
      ]),
      new QuestionNode("e", "E", FieldType.Boolean),
    ])
  ]),
  new QuestionNode("f", "F", FieldType.Boolean),
  new QuestionNode("g", "G", FieldType.Boolean),
]);

export const nestedFormScopeFlawed1 = new FormNode("nestedFormScopeFlawed1", [
  new QuestionNode("a", "A", FieldType.Boolean),
  new IfCondition(new VariableIdentifier("b"), [
    new QuestionNode("x", "X", FieldType.Boolean)
  ]),
  new QuestionNode("b", "B", FieldType.Boolean),
]);

export const nestedFormScopeFlawed2 = new FormNode("nestedFormScopeFlawed2", [
  new QuestionNode("a", "A", FieldType.Boolean),
  new IfCondition(new VariableIdentifier("x"), [
    new QuestionNode("x", "X", FieldType.Boolean)
  ]),
  new QuestionNode("b", "B", FieldType.Boolean),
]);

export const nestedFormScopeFlawed3 = new FormNode("nestedFormScopeFlawed3", [
  new IfCondition(new BooleanLiteral(true), [
    new QuestionNode("a", "A", FieldType.Boolean)
  ]),
  new ComputedField("x", "X", FieldType.Boolean, new VariableIdentifier("a")),
  new QuestionNode("b", "B", FieldType.Boolean),
]);

export const nestedFormFieldDeclaredTwice = new FormNode("nestedFormFieldDeclaredTwice", [
  new IfCondition(new BooleanLiteral(true), [
    new QuestionNode("a", "A", FieldType.Boolean)
  ]),
  new QuestionNode("a", "A", FieldType.Boolean),
  new QuestionNode("b", "B", FieldType.Boolean)
]);