import ExpressionVisitor from "../visitors/ExpressionVisitor";
import { FieldType } from "../../FieldType";
import { ValueIsNaNError } from "../../form_errors";
import NumberValue from "../../values/NumberValue";
import { DecimalValue } from "../../values/DecimalValue";
import IntValue from "../../values/IntValue";
import AbstractLiteral from "./AbstractLiteral";

export default class NumberLiteral extends AbstractLiteral {
  private type: FieldType;
  private value: NumberValue;

  static fromString(text: string) {
    if (Number.isNaN(Number(text))) {
      throw ValueIsNaNError.make(text);
    }

    let type: FieldType = FieldType.Decimal;
    let value: number = parseFloat(text);

    if (text.indexOf('.') === -1) {
      type = FieldType.Integer;
      value = parseInt(text, 10);
    }

    return new NumberLiteral(value, type);
  }

  constructor(value: number, type?: FieldType) {
    super();

    if (!type) {
      type = FieldType.Decimal;
    }

    this.type = type;
    this.setValueFromNumber(value);
  }

  setValueFromNumber(value: number) {
    if (this.type === FieldType.Integer) {
      this.value = new IntValue(Math.round(value));
      return;
    }

    this.value = new DecimalValue(value);

  }

  accept(visitor: ExpressionVisitor): any {
    return visitor.visitNumberLiteral(this);
  }

  getValue(): NumberValue {
    return this.value;
  }

  getType(): FieldType {
    return this.type;
  }

}