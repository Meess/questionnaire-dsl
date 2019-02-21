import { CannotFindCommonFieldTypeError } from "./form_errors";

export enum FieldType {
  Boolean = "boolean",
  Money = "money",
  Date = "date",
  Integer = "integer",
  Decimal = "decimal",
  Text = "text"
} 

export const numericFieldTypes = [FieldType.Integer, FieldType.Decimal, FieldType.Money];

export const numericFieldTypeOrder = [FieldType.Integer, FieldType.Decimal, FieldType.Money];

export const isNumericFieldType = (fieldType: FieldType) => {
  return numericFieldTypes.indexOf(fieldType) !== -1;
};

export const getCommonNumericFieldType = (typeOne: FieldType, typeTwo: FieldType): FieldType => {
  const indexOne = numericFieldTypeOrder.indexOf(typeOne);
  const indexTwo = numericFieldTypeOrder.indexOf(typeTwo);

  if (indexOne === -1 || indexTwo === -1) {
    throw CannotFindCommonFieldTypeError.make(typeOne, typeTwo);
  }

  return numericFieldTypeOrder[Math.max(indexOne, indexTwo)];
};

export const fieldTypesSortable = (typeOne: FieldType, typeTwo: FieldType): boolean => {
  if (isNumericFieldType(typeOne) && isNumericFieldType(typeTwo)) {
    return true;
  }

  if (typeOne === FieldType.Date && typeTwo === FieldType.Date) {
    return true;
  }

  return false;
};
