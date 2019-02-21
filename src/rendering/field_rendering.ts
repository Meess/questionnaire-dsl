import { FieldType } from "../form/FieldType";
import { fieldComponentsMapping } from "../config/field_components_mapping";
import { CannotRenderFieldType } from "./rendering_errors";

export const findComponentForFieldType: any = (type: FieldType, mapping?: { type: FieldType, component: any }[]) => {
  if (!mapping) {
    mapping = fieldComponentsMapping;
  }

  const pair = mapping.find(_pair => {
    return type === _pair.type;
  });

  if (!pair) {
    throw CannotRenderFieldType.make(type);
  }

  return pair.component;
};