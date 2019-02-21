import GenericCollection from "./GenericCollection";
import VariableIdentifier from "../nodes/expressions/VariableIdentifier";

export default class IdentifierNodeCollection extends GenericCollection<VariableIdentifier> {
  getIdentifierNames(): string[] {
    return this.toArray().map(identifierNode => identifierNode.identifier);
  }
}