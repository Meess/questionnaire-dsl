import { BooleanField } from "../rendering/components/field/BooleanField";
import { MoneyField } from "../rendering/components/field/MoneyField";
import { TextField } from "../rendering/components/field/TextField";
import { FieldType } from "../form/FieldType";
import { NumberField } from "../rendering/components/field/NumberField";
import { DateField } from "../rendering/components/field/DateField";

export const fieldComponentsMapping: { type: FieldType, component: any }[] = [
  {
    type: FieldType.Boolean,
    component: BooleanField
  },
  {
    type: FieldType.Money,
    component: MoneyField
  },
  {
    type: FieldType.Text,
    component: TextField
  },
  {
    type: FieldType.Integer,
    component: NumberField
  },
  {
    type: FieldType.Decimal,
    component: NumberField
  },
  {
    type: FieldType.Date,
    component: DateField
  }
];