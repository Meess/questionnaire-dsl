import AbstractStyleNode from "../AbstractStyleNode";
import StyleAttribute from "../StyleAttribute";
import StyleNodeVisitor from "../../visitors/StyleNodeVisitor";

export default abstract class BaseAttribute extends AbstractStyleNode implements StyleAttribute {
  accept(visitor: StyleNodeVisitor): any {
    return visitor.visitBaseAttribute(this);
  }

  getRenderComponent() {
    return null;
  }

  abstract getCssValues(): object;

  abstract getName(): string;

  abstract getStringValue(): string;
}