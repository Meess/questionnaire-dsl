import FieldNode from "./FieldNode";
import { FieldType } from "../../FieldType";
import NodeVisitor from "../visitors/NodeVisitor";
import FormState from "../../state/FormState";
import NodeLocation from "../location/NodeLocation";
import StatementCollection from "../../collection/StatementCollection";

/**
 * Decorator for Fields that makes the Field "decoratable" for future usage.
 */
export default class FieldNodeDecorator implements FieldNode {
  private fieldToBeDecorated: FieldNode;

  get identifier(): string {
    return this.fieldToBeDecorated.identifier;
  }

  get label(): string {
    return this.fieldToBeDecorated.label;
  }

  get type(): FieldType {
    return this.fieldToBeDecorated.type;
  }

  constructor(fieldToBeDecorated: FieldNode) {
    this.fieldToBeDecorated = fieldToBeDecorated;
  }

  accept(visitor: NodeVisitor) {
    return visitor.visitFieldDecorator(this);
  }

  isReadOnly(): boolean {
    return this.fieldToBeDecorated.isReadOnly();
  }

  computeAnswer(state: FormState) {
    return this.fieldToBeDecorated.computeAnswer(state);
  }

  setLocation(location: NodeLocation): FieldNodeDecorator {
    this.fieldToBeDecorated.setLocation(location);
    return this;
  }

  getLocation(): NodeLocation {
    return this.fieldToBeDecorated.getLocation();
  }

  getBaseField(): FieldNode {
    return this.fieldToBeDecorated;
  }

  addToCollection(collection: StatementCollection): void {
    this.fieldToBeDecorated.addToCollection(collection);
  }
}