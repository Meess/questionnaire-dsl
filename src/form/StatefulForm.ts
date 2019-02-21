import FieldNode from "./nodes/fields/FieldNode";
import FormState from "./state/FormState";
import FieldVisitor from "./nodes/visitors/FieldVisitor";
import FormNode from "./nodes/FormNode";
import { VariablesMap } from "./type_checking/VariableScopeVisitor";
import { Maybe } from "../helpers/type_helper";

export default interface StatefulForm {
  getRootNode(): FormNode;

  getName(): string;

  getFields(): FieldNode[];

  getField(identifier: string): Maybe<FieldNode> | any;

  getState(): FormState | any;

  setState(state: FormState): StatefulForm;

  getVariablesMap(): VariablesMap;

  setAnswer(identifier: string, value: any): StatefulForm;

  getAnswer(identifier: string): any;

  accept(visitor: FieldVisitor): any;
}