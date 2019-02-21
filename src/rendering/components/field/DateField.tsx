import * as React from 'react';
import { FormGroup, Label, InputGroup, Input } from 'reactstrap';
import FieldNode from "../../../form/nodes/fields/FieldNode";
import DatePicker from 'react-datepicker';
import { Moment } from 'moment';

const moment = require("moment");

export interface MoneyFieldProps {
  value: Date;
  field: FieldNode;
  onChange: (value: any) => void;
}

export const DateField: React.SFC<MoneyFieldProps> = (props) => {
  const onChange = (momentDate: Moment) => {
    props.onChange(momentDate.toDate());
  };

  return (
      <FormGroup>
        <Label for={props.field.identifier}>{props.field.label}</Label>
        <DatePicker
            className="form-control"
            selected={(props.value) ? moment(props.value) : null}
            onChange={onChange}
            locale="en-gb"
            dateFormat="DD.MM.YYYY"
        />
      </FormGroup>
  );
};