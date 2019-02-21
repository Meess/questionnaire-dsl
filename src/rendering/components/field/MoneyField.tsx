import * as React from 'react';
import { FormGroup, Label, InputGroup } from 'reactstrap';
import FieldNode from "../../../form/nodes/fields/FieldNode";
import { NumberField } from "./NumberField";
import MoneyValue from "../../../form/values/MoneyValue";

export interface MoneyFieldProps {
  value: MoneyValue;
  field: FieldNode;
  onChange: (value: any) => void;
}

export const MoneyField: React.SFC<MoneyFieldProps> = (props) => {
  const renderCurrencyAddon = () => {
    return (
        <div className="input-group-append">
          <span className="input-group-text">€</span>
        </div>
    );
  };

  return (
      <NumberField
          field={props.field}
          onChange={props.onChange}
          value={props.value}
          renderInputAddon={renderCurrencyAddon}
      />
  );
};