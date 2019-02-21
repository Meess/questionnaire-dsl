import FormNode from "../../form/nodes/FormNode";
import QuestionNode from "../../form/nodes/fields/QuestionNode";
import { FieldType } from "../../form/FieldType";
import ComputedField from "../../form/nodes/fields/ComputedFieldNode";
import Addition from "../../form/nodes/expressions/arithmetic/Addition";
import VariableIdentifier from "../../form/nodes/expressions/VariableIdentifier";
import QlForm from "../../form/QlForm";
import FormState from "../../form/state/FormState";
import IntValue from "../../form/values/IntValue";
import Form from "../../form/StatefulForm";

const nestedFormNode = new FormNode("fishy", [
      new QuestionNode("priceFishOne", "How much is the fish?", FieldType.Integer),
      new QuestionNode("priceFishTwo", "How much is the second fish?", FieldType.Integer),
      new QuestionNode("priceFishThree", "How much is the third fish?", FieldType.Integer),
      new ComputedField(
          "priceFishOneAndTwo",
          "Price of fish one and two",
          FieldType.Integer,
          new Addition(new VariableIdentifier("priceFishOne"), new VariableIdentifier("priceFishTwo")
          )
      ),
      new ComputedField(
          "priceAllFishes",
          "Price of all fishes",
          FieldType.Integer,
          new Addition(new VariableIdentifier("priceFishOneAndTwo"), new VariableIdentifier("priceFishThree")
          )
      )
    ]
);

it("evaluates nested computed fields correctly", () => {
  let form: Form = new QlForm(nestedFormNode, new FormState());

  form = form.setAnswer("priceFishOne", new IntValue(1));
  form = form.setAnswer("priceFishTwo", new IntValue(2));
  form = form.setAnswer("priceFishThree", new IntValue(3));

  let priceFishOneAndTwo = form.getAnswer("priceFishOneAndTwo");
  let priceAllFishes = form.getAnswer("priceAllFishes");

  expect(priceFishOneAndTwo).toEqual(new IntValue(3));
  expect(priceAllFishes).toEqual(new IntValue(6));

  form = form.setAnswer("priceFishTwo", new IntValue(100));
  priceFishOneAndTwo = form.getAnswer("priceFishOneAndTwo");
  priceAllFishes = form.getAnswer("priceAllFishes");

  expect(priceFishOneAndTwo).toEqual(new IntValue(101));
  expect(priceAllFishes).toEqual(new IntValue(104));
});