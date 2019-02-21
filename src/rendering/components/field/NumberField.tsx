import * as React from 'react';
import { FormGroup, Label, Input, InputGroup } from 'reactstrap';
import FieldNode from "../../../form/nodes/fields/FieldNode";
import NumberValue from "../../../form/values/NumberValue";
import { makeNumberValue } from "../../../form/values/values_helpers";
import { FieldType } from "../../../form/FieldType";

export interface NumberFieldProps {
  value: NumberValue;
  field: FieldNode;
  onChange: (value: any) => void;
  renderInputAddon?: () => void;
}

export interface NumberFieldState {
  temporaryStringValue: string;
}

export class NumberField extends React.Component<NumberFieldProps, NumberFieldState> {
  constructor(props: NumberFieldProps) {
    super(props);

    this.state = {
      temporaryStringValue: ""
    };
  }

  isInteger() {
    return this.props.field.type === FieldType.Integer;
  }

  onChange(value: string) {
    if (this.isInteger() && (value.includes(',') || value.includes("."))) {
      return;
    }

    this.props.onChange(makeNumberValue(value, this.props.field.type));

    this.setState({
      temporaryStringValue: value
    });
  }

  getStringValue() {
    if (!this.props.value) {
      return "";
    }

    if (this.props.field.isReadOnly() || this.state.temporaryStringValue.length === 0) {
      return this.props.value.toString();
    }

    if (this.props.value.toNumber() !== parseFloat(this.state.temporaryStringValue)) {
      return this.props.value.toString();
    }

    return this.state.temporaryStringValue;
  }

  renderInputAddon() {
    if (!this.props.renderInputAddon) {
      return null;
    }

    return this.props.renderInputAddon();
  }

  render() {
    return (
        <FormGroup>
          <Label for={this.props.field.identifier}>{this.props.field.label}</Label>
          <InputGroup>
            <Input
                readOnly={this.props.field.isReadOnly()}
                name={this.props.field.identifier}
                type="number"
                onChange={e => this.onChange(e.target.value)}
                value={this.getStringValue()}
            />
            {this.renderInputAddon()}
          </InputGroup>
        </FormGroup>
    );
  }
}