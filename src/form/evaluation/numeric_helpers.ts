import Decimal from "decimal.js/decimal";
import DecimalConstructor from "decimal.js/decimal.js";

export const toDecimal = (value: string | number | Decimal): Decimal => {
  return new DecimalConstructor(value);
};