import Addition from "../form/nodes/expressions/arithmetic/Addition";
import NumberLiteral from "../form/nodes/literals/NumberLiteral";
import Multiplication from "../form/nodes/expressions/arithmetic/Multiplication";
import Equals from "../form/nodes/expressions/comparisons/Equals";
import FormNode from "../form/nodes/FormNode";
import EvaluationVisitor from "../form/evaluation/EvaluationVisitor";
import QuestionNode from "../form/nodes/fields/QuestionNode";
import Variable from "../form/nodes/expressions/VariableIdentifier";
import BooleanLiteral from "../form/nodes/literals/BooleanLiteral";
import IfCondition from "../form/nodes/conditions/IfCondition";
import Negation from "../form/nodes/expressions/boolean_expressions/Negation";
import ComputedField from "../form/nodes/fields/ComputedFieldNode";
import { FieldType } from "../form/FieldType";

export const testExpressionStuff = () => {
  const formula = new Multiplication(
      new NumberLiteral(5),
      new Addition(
          new NumberLiteral(3),
          new Multiplication(
              new NumberLiteral(3),
              new NumberLiteral(2)
          )
      )
  );
  const evaluator = new EvaluationVisitor();

  const formula2 = new Equals(
      new NumberLiteral(45),
      new Addition(
          new NumberLiteral(5),
          new Multiplication(
              new NumberLiteral(4),
              new NumberLiteral(10)
          )
      )
  );

  const form1 = new FormNode("MyForm1", [
    new QuestionNode("q1", "Is q1 true?", FieldType.Boolean),
    new ComputedField("q2", "Is q1 false?", FieldType.Boolean, new Equals(
        new Variable("q1"),
        new BooleanLiteral(true)
    )),
    new IfCondition(new Negation(new Variable("q1")), [
      new QuestionNode("q3", "Only visible if q1  is false?", FieldType.Boolean),
    ]),
    new IfCondition(new Negation(new Variable("q2")), [
      new QuestionNode("q3", "Only visible if q1  is false?", FieldType.Boolean),
    ])
  ]);

  console.log(form1);

  console.log(formula2.accept(evaluator)); // true
  console.log(formula.accept(evaluator));

};
