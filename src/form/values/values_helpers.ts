import NumberValue from "./NumberValue";
import { FieldType } from "../FieldType";
import IntValue from "./IntValue";
import { DecimalValue } from "./DecimalValue";
import MoneyValue from "./MoneyValue";

export const isNumberValue = (value: any): value is NumberValue => {
  return value && typeof value === 'object' && value.type === "NumberValue";
};

export const makeNumberValue = (value: string, type?: FieldType): NumberValue => {
  if (type === FieldType.Integer) {
    return new IntValue(parseInt(value, 10));
  }

  if (type === FieldType.Money) {
    return new MoneyValue(parseFloat(value));
  }

  return new DecimalValue(parseFloat(value));
};