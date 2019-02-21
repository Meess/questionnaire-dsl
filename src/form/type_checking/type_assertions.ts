import {
  DivisionByZeroError, ValuesNotComparableError,
  TypeCheckError
} from "../form_errors";
import { FieldType, numericFieldTypes } from "../FieldType";
import NumberValue from "../values/NumberValue";
import IntValue from "../values/IntValue";
import NumericOperation from "../values/NumericOperation";
import { isNumberValue } from "../values/values_helpers";
import constants from "../../config/constants";
import TreeNode from "../nodes/TreeNode";

/**
 * Returns the type of a given value including the classname if it is
 * a class instance. Often useful to output the type of an object in an error
 * message.
 *
 * @param value
 * @returns string
 */
export const getTypeString = (value: any) => {
  if (Array.isArray(value)) {
    return "array";
  }

  if (value === null) {
    return "null";
  }

  if (typeof value === "object" && value.constructor) {
    return value.constructor.name;
  }

  return typeof value;
};

/**
 * Assert that the types a given object is as expected or fail.
 *
 * @param value
 * @param {string} expectedType
 * @returns {any}
 */
export const assertType = (value: any, expectedType: string) => {
  let typeName = typeof value;

  if (typeName === 'object' && expectedType !== 'object' && value.constructor && value.constructor.name) {
    typeName = value.constructor.name;
  }

  if (typeName !== expectedType) {
    throw TypeCheckError.make(expectedType, getTypeString(value));
  }

  return value;
};

/**
 * Assert that the field type fits with the expected type.
 *
 * @param {FieldType} actualType
 * @param {FieldType} expectedType
 * @param {TreeNode} node
 * @returns {FieldType}
 */
export const assertFieldType = (actualType: FieldType, expectedType: FieldType, node?: TreeNode): FieldType => {
  if (actualType !== expectedType) {
    throw TypeCheckError.make(expectedType, actualType, node);
  }

  return expectedType;
};

/**
 * Assert that the given type fits at least with one of the given types that are allowed.
 *
 * @param {FieldType} actualType
 * @param {FieldType[]} allowedTypes
 * @param node
 * @returns {FieldType}
 */
export const assertAnyFieldType = (actualType: FieldType, allowedTypes: FieldType[], node?: TreeNode): FieldType => {
  if (allowedTypes.indexOf(actualType) === -1) {
    throw TypeCheckError.make(allowedTypes.join(' or '), actualType, node);
  }

  return actualType;
};

/**
 * Assert that the types of the value is "boolean" or fail otherwise.
 *
 * @param value
 * @returns {any}
 */
export const assertBoolean = (value: any) => {
  return assertType(value, "boolean");
};

/**
 * Assert that the types of the value is "string" or fail otherwise.
 *
 * @param value
 * @returns {any}
 */
export const assertString = (value: any) => {
  return assertType(value, "string");
};

/**
 * Assert that the types of the value is "date" or fail otherwise.
 *
 * @param value
 * @returns {any}
 */
export const assertDate = (value: any) => {
  return assertType(value, "Date");
};

/**
 * Assert that the types of the value is "Decimal" or fail otherwise.
 *
 * @param value
 * @returns {any}
 */
export const assertNumberValue = (value: any): NumberValue => {
  if (!isNumberValue(value)) {
    throw TypeCheckError.make("NumberValue", getTypeString(value));
  }

  return value;
};

/**
 * Assert that the given type of field allows numeric values.
 *
 * @param {FieldType} fieldType
 * @param node
 * @returns {FieldType}
 */
export const assertNumericFieldType = (fieldType: FieldType, node?: TreeNode): FieldType => {
  return assertAnyFieldType(fieldType, numericFieldTypes, node);
};

/**
 * Assert that the value given is comparable to other values of the same type.
 *
 * @param value
 * @param node
 * @returns {any}
 */
export const assertComparable = (value: any, node?: TreeNode) => {
  if (isNumberValue(value)) {
    return value;
  }

  if (constants.COMPARABLE_TYPES.indexOf(getTypeString(value)) === -1) {
    throw TypeCheckError.make("comparable", getTypeString(value), node);
  }

  return value;
};

/**
 * Check if the dividend and the divisor build up a valid division (both numeric and
 * not divided by zero) or fail otherwise.
 *
 * @param dividend
 * @param divisor
 * @returns {{dividend: Numeric; divisor: NumberValue}}
 */
export const assertValidDivision = (dividend: NumberValue, divisor: NumberValue) => {
  dividend = assertNumberValue(dividend);
  divisor = assertNumberValue(divisor);

  if (NumericOperation.make(divisor, new IntValue(0)).equals()) {
    throw DivisionByZeroError.make();
  }

  return {dividend, divisor};
};

/**
 * Assert that the left and the right sight have the same type.
 *
 * @param left
 * @param right
 * @param node
 * @returns {{left: any; right: any}}
 */
export const assertSameType = (left: any, right: any, node?: TreeNode) => {
  if (typeof left !== typeof right) {
    throw ValuesNotComparableError.make(left, right);
  }

  if (isNumberValue(left) && !isNumberValue(right) ||
      !isNumberValue(left) && isNumberValue(right)) {
    throw ValuesNotComparableError.make(left, right, node);
  }

  return {left, right};
};