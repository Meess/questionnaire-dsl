import StyleAttribute from "./nodes/StyleAttribute";
import { FieldType } from "../../../form/FieldType";
import DefaultStyleNode from "./nodes/children/DefaultStyleNode";
import WidgetAttribute from "./nodes/attributes/WidgetAttribute";
import FieldNode from "../../../form/nodes/fields/FieldNode";
import { Maybe } from "../../../helpers/type_helper";

export default class MergedFieldStyle {
  private styles: Map<string, StyleAttribute | any>;
  private identifier: string;
  private type: FieldType;

  constructor(identifier: string, type: FieldType) {
    this.identifier = identifier;
    this.type = type;
    this.styles = new Map();
  }

  getIdentifier(): string {
    return this.identifier;
  }

  applyDefaults(defaults: DefaultStyleNode[]) {
    defaults.forEach(defaultNode => {
      this.applyDefault(defaultNode);
    });
  }

  applyDefault(defaultNode: DefaultStyleNode) {
    if (this.type !== defaultNode.type) {
      return;
    }

    this.applyStyle(defaultNode.children);
  }

  applyStyle(attributes: StyleAttribute[]) {
    attributes.forEach(styleAttribute => {
      this.styles.set(styleAttribute.getName(), styleAttribute);
    });
  }

  getFieldContainerCssStyle(): object {
    const cssStyles = {};

    this.styles.forEach((attribute: StyleAttribute, key: string) => {
      Object.assign(cssStyles, attribute.getCssValues());
    });

    return cssStyles;
  }

  getWidgetAttribute(): Maybe<WidgetAttribute> {
    return this.styles.get('widget');
  }

  appliesToField(field: FieldNode) {
    return this.identifier === field.identifier;
  }

  static makeEmpty(field: FieldNode) {
    return new MergedFieldStyle(field.identifier, field.type);
  }
}