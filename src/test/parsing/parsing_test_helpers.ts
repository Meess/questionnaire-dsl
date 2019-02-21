import FormNode from "../../form/nodes/FormNode";
import { getQlParser } from "../../parsing/parsing_helpers";
import Statement from "../../form/nodes/Statement";

const qlParser = getQlParser();

export const getFirstFormNode = (qlInput): FormNode => {
  const forms: FormNode[] = qlParser.parse(qlInput);
  return forms[0];
};

export const getFirstStatement = (qlInput): Statement => {
  return getFirstFormNode(qlInput).statements[0];
};