import { VariablesMap } from "../../../form/type_checking/VariableScopeVisitor";
import { getQuestionStyleNodes } from "./style_helpers";
import { VariableInformation } from "../../../form/VariableIntformation";
import StyleSheetNode from "../form/nodes/StyleSheetNode";

export const findUnplacedFields = (styleSheetNode: StyleSheetNode, variables: VariablesMap): VariablesMap => {
  const questionStyleNodes = getQuestionStyleNodes(styleSheetNode, true);

  const unplacedFields: VariablesMap = new Map();

  variables.forEach((variable: VariableInformation) => {
    const isPlaced: boolean = Boolean(questionStyleNodes.find((node) => node.isVariable(variable)));

    if (isPlaced) {
      return;
    }

    unplacedFields.set(variable.identifier, variable);
  });

  return unplacedFields;
};