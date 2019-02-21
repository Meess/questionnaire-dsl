import AbstractStyleNode from "../AbstractStyleNode";
import StyleAttribute from "../StyleAttribute";
import StyleNodeVisitor from "../../visitors/StyleNodeVisitor";

export default abstract class WidgetAttribute extends AbstractStyleNode implements StyleAttribute {
  readonly options: string[] | undefined;

  constructor(options?: string[]) {
    super();
    this.options = options;
  }

  accept(visitor: StyleNodeVisitor) {
    return visitor.visitWidgetAttribute(this);
  }

  getName(): string {
    return "widget";
  }

  getCssValues(): object {
    return {};
  }

  getValue(): string {
    return "";
  }

  getStringValue(): string {
    return "";
  }

  abstract validate();

  abstract getRenderComponent();
}
