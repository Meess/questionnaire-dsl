import * as React from 'react';
import SpinboxAttribute from "../../../form/nodes/attributes/widget_attribtues/SpinBoxWidgetAttribute";
import { NumberField } from "../../../../../rendering/components/field/NumberField";
import NumberValue from "../../../../../form/values/NumberValue";
import FieldNode from "../../../../../form/nodes/fields/FieldNode";
import Button from "reactstrap/lib/Button";
import { makeNumberValue } from "../../../../../form/values/values_helpers";

export interface SpinboxWidgetComponentProps {
  widget: SpinboxAttribute;
  value: NumberValue;
  field: FieldNode;
  onChange: (value: any) => void;
}

export const SpinboxWidgetComponent: React.SFC<SpinboxWidgetComponentProps> = (props) => {
  const value = (props.value) ? props.value : makeNumberValue("0", props.field.type);
  const disabled = props.field.isReadOnly();

  const renderSpinboxInputs = () => {
    return (
        <div className="input-group-append">
          <Button disabled={disabled} color="outline-secondary" onClick={() => props.onChange(value.increment())}>
            +
          </Button>
          <Button disabled={disabled} color="outline-secondary" onClick={() => props.onChange(value.decrement())}>
            -
          </Button>
        </div>
    );
  };

  return (
      <NumberField
          field={props.field}
          onChange={props.onChange}
          value={props.value}
          renderInputAddon={renderSpinboxInputs}
      />
  );
};