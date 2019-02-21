import { FieldType } from "../../FieldType";
import Statement from "../Statement";
import FormState from "../../state/FormState";

/**
 * Field that can be computed or displays and input for a question.
 */
export default interface FieldNode extends Statement {
  readonly identifier: string;
  readonly label: string;
  readonly type: FieldType;

  isReadOnly(): boolean;

  computeAnswer(state: FormState): any;
}