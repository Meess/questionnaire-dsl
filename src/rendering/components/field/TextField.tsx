import * as React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import FieldNode from "../../../form/nodes/fields/FieldNode";

export interface TextFieldProps {
  value: string;
  field: FieldNode;
  onChange: (value: any) => void;
}

export const TextField: React.SFC<TextFieldProps> = (props) => {
  return (
      <FormGroup>
        <Label for={props.field.identifier}>{props.field.label}</Label>
        <Input
            readOnly={props.field.isReadOnly()}
            name={props.field.identifier}
            type="text"
            onChange={e => props.onChange(e.target.value)}
            value={props.value || ""}
        />
      </FormGroup>
  );
};