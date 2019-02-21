import * as React from 'react';
import TextAttribute from "../../../form/nodes/attributes/widget_attribtues/TextWidgetAttribute";
import FieldNode from "../../../../../form/nodes/fields/FieldNode";
import { fieldComponentsMapping } from "../../../../../config/field_components_mapping";
import { findComponentForFieldType } from "../../../../../rendering/field_rendering";

export interface TextWidgetComponentProps {
  widget: TextAttribute;
  value: any;
  field: FieldNode;
  onChange: (value: any) => void;
}

export const TextWidgetComponent: React.SFC<TextWidgetComponentProps> = (props) => {
  const FieldComponent = findComponentForFieldType(props.field.type, fieldComponentsMapping);

  return (
      <div className="field-container">
        <FieldComponent onChange={props.onChange} value={props.value} field={props.field}/>
      </div>
  );
};