import NodeLocation from "../form/nodes/location/NodeLocation";
import { Maybe } from "../helpers/type_helper";
import { getTypeString } from "../form/type_checking/type_assertions";

const qlParser = require("./parsers/ql_parser");

export const getParserErrorMessage = (error: Error | any) => {
  let message = error.message;
  let location: Maybe<NodeLocation>;
  let postfix = "";

  if (error.location) {
    location = error.location;
  }

  if (!location && error.node && error.node.getLocation()) {
    location = error.node.getLocation();
  }

  if (location) {
    postfix += `Line: ${location.start.line}`;
  }

  if (error.node) {
    postfix += `, ${getTypeString(error.node)}`;
  }

  if (postfix.length > 0) {
    message = `${message} (${postfix})`;
  }

  return message;
};

export const getQlParser = () => {
  return qlParser;
};