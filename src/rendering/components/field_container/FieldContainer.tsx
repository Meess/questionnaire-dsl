import * as React from 'react';
import Field from "../../../form/nodes/fields/FieldNode";
import { findComponentForFieldType } from "../../field_rendering";
import { fieldComponentsMapping } from "../../../config/field_components_mapping";

export interface FieldContainerProps {
  field: Field;
  onChange: (value: any) => void;
  value: any;
}

export const FieldContainer: React.SFC<FieldContainerProps> = (props) => {
  const FieldComponent = findComponentForFieldType(props.field.type, fieldComponentsMapping);

  return (
      <div className="field-container">
        <FieldComponent onChange={props.onChange} value={props.value} field={props.field}/>
      </div>
  );
};