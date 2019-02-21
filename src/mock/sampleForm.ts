import Form from "../form/StatefulForm";
import { FieldType } from "../form/FieldType";
import FormNode from "../form/nodes/FormNode";
import QuestionNode from "../form/nodes/fields/QuestionNode";
import IfCondition from "../form/nodes/conditions/IfCondition";
import VariableIdentifier from "../form/nodes/expressions/VariableIdentifier";
import ComputedField from "../form/nodes/fields/ComputedFieldNode";
import Subtraction from "../form/nodes/expressions/arithmetic/Subtraction";
import QlForm from "../form/QlForm";
import FormState from "../form/state/FormState";

/*
 Bases on example form given by professor:

 form Box1HouseOwning {
  hasSoldHouse: “Did you sell a house in 2010?” boolean
  hasBoughtHouse: “Did you by a house in 2010?” boolean
  hasMaintLoan: “Did you enter a loan for maintenance/reconstruction?”
  boolean
  if (hasSoldHouse) {
  sellingPrice: “Price the house was sold for:” money
  privateDebt: “Private debts for the sold house:” money
  valueResidue: “Value residue:” money(sellingPrice - privateDebt)
  }
  }
 */

const formNode: FormNode = new FormNode("Box1HouseOwning", [
  new QuestionNode("hasSoldHouse", "Did you sell a house in 2010?", FieldType.Boolean),
  new QuestionNode("hasBoughtHouse", "Did you by a house in 2010?", FieldType.Boolean),
  new QuestionNode("hasMaintLoan", "Did you enter a loan for maintenance/reconstruction?", FieldType.Boolean),
  new IfCondition(new VariableIdentifier("hasSoldHouse"), [
    new QuestionNode("sellingPrice", "Price the house was sold for:", FieldType.Money),
    new QuestionNode("privateDebt", "Private debts for the sold house:", FieldType.Money),
    new ComputedField(
        "valueResidue",
        "Value residue:", FieldType.Money,
        new Subtraction(new VariableIdentifier("sellingPrice"), new VariableIdentifier("privateDebt")
        )
    ),
  ]),
]);

export const sampleForm: Form = new QlForm(formNode, new FormState(new Map()));