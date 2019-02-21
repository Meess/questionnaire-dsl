import * as React from 'react';
import DropdownAttribute from "../../../form/nodes/attributes/widget_attribtues/DropdownWidgetAttribute";
import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/lib/Label";
import Input from "reactstrap/lib/Input";
import FieldNode from "../../../../../form/nodes/fields/FieldNode";

export interface DropdownWidgetComponentProps {
  widget: DropdownAttribute;
  value: boolean;
  field: FieldNode;
  onChange: (value: any) => void;
}

export const DropdownWidgetComponent: React.SFC<DropdownWidgetComponentProps> = (props) => {
  const onChange = (value: string) => {
    props.onChange((value === "true"));
  };

  return (
      <FormGroup>
        <Label for={props.field.identifier}>{props.field.label}</Label>
        <Input
            value={(props.value) ? "true" : "false"}
            onChange={event => onChange(event.target.value)}
            type="select"
            name={props.field.identifier}
        >
          <option value={"true"}>{props.widget.getTrueLabel()} </option>
          <option value={"false"}>{props.widget.getFalseLabel()} </option>
        </Input>
      </FormGroup>
  );
};