import * as React from 'react';
import SliderAttribute from "../../../form/nodes/attributes/widget_attribtues/SliderWidgetAttribute";
import FieldNode from "../../../../../form/nodes/fields/FieldNode";
import DropdownAttribute from "../../../form/nodes/attributes/widget_attribtues/DropdownWidgetAttribute";
import Label from "reactstrap/lib/Label";
import NumberValue from "../../../../../form/values/NumberValue";
import { makeNumberValue } from "../../../../../form/values/values_helpers";

export interface SliderWidgetComponentProps {
  widget: SliderAttribute;
  value: NumberValue;
  field: FieldNode;
  onChange: (value: any) => void;
}

export const SliderWidgetComponent: React.SFC<SliderWidgetComponentProps> = (props) => {
  const value = (props.value) ? props.value.toString() : "";

  const onChange = (newValue: string) => {
    props.onChange(makeNumberValue(newValue, props.field.type));
  };

  return (
      <div className="slidecontainer">
        <Label for={props.field.identifier}>{props.field.label}</Label>
        <input
            className="form-control"
            onChange={e => onChange(e.target.value)}
            type="range"
            min={props.widget.getMinimum().toString()}
            max={props.widget.getMaximum().toString()}
            value={value}
        />{" "}
        {value}
      </div>
  );
};