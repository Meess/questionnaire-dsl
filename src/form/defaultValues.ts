import { FieldType } from "./FieldType";

const defaultValues: [FieldType, any][] = [
  [FieldType.Boolean, false],
  [FieldType.Money, null],
  [FieldType.Date, null],
  [FieldType.Integer, null],
  [FieldType.Decimal, null],
  [FieldType.Text, ""]
];

export default new Map<FieldType, any>(defaultValues);