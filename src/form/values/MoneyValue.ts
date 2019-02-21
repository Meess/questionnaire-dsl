import { DecimalValue } from "./DecimalValue";
import Decimal from "decimal.js/decimal";

export default class MoneyValue extends DecimalValue {
  constructor(value: number | Decimal) {
    super(value);
    this.value = this.value.mul(100).round().div(100);
  }
}