import { VariableInformation } from "../../../form/VariableIntformation";
import FieldNode from "../../../form/nodes/fields/FieldNode";
import { Maybe } from "../../../helpers/type_helper";
import { FormWarning } from "../../../form/form_warnings";

export class FormStyleWarning extends FormWarning {

}

export class UnplacedQuestionWarning extends FormStyleWarning {
  private variable: VariableInformation;
  private node: Maybe<FieldNode>;
  private message: string;

  constructor(variable: VariableInformation, message?: string) {
    super();
    this.variable = variable;

    if (!message) {
      message = `Field "${variable.identifier} was not placed in QLS.`;
    }

    this.message = message;
    this.node = variable.fieldNode;
  }
}