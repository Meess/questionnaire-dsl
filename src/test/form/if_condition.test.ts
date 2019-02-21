import VisibleFieldsVisitor from "../../form/evaluation/VisibleFieldsVisitor";
import QlForm from "../../form/QlForm";
import IfCondition from "../../form/nodes/conditions/IfCondition";
import BooleanLiteral from "../../form/nodes/literals/BooleanLiteral";
import QuestionNode from "../../form/nodes/fields/QuestionNode";
import { FieldType } from "../../form/FieldType";
import FormNode from "../../form/nodes/FormNode";
import FormState from "../../form/state/FormState";

it("shows fields of else path if predicate is false", () => {
  const formStructure = new FormNode("main", [
    new IfCondition(
        new BooleanLiteral(false),
        [new QuestionNode("thenQuestion", "Then question", FieldType.Boolean)],
        [new QuestionNode("elseQuestion", "Then question", FieldType.Boolean)],
    )
  ]);

  const form = new QlForm(formStructure, new FormState());

  const visibleFields = VisibleFieldsVisitor.run(form);

  expect(visibleFields.size).toBe(1);

  const firstKey: string = visibleFields.keys().next().value;
  expect(firstKey).toBe("elseQuestion");
});