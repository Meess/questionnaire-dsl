import FieldNode from "./nodes/fields/FieldNode";
import { FieldType } from "./FieldType";

export type VariablesInformation = Map<string, VariableInformation>;

export interface VariableInformation {
  identifier: string;
  type: FieldType;
  fieldNode?: FieldNode;
  location?: any;
}

export const getVariableInformation = (fieldNode: FieldNode): VariableInformation => {
  return {
    identifier: fieldNode.identifier,
    fieldNode: fieldNode,
    type: fieldNode.type,
    location: null
  };
};

export const variablesToMap = (variables: VariableInformation[]): VariablesInformation => {
  const information: VariablesInformation = new Map();

  variables.forEach((variable) => {
    information.set(variable.identifier, variable);
  });

  return information;
};