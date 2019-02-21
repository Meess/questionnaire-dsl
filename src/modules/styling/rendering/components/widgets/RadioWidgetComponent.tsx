import * as React from 'react';
import RadioAttribute from "../../../form/nodes/attributes/widget_attribtues/RadioWidgetAttribute";
import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/lib/Label";
import Input from "reactstrap/lib/Input";
import FieldNode from "../../../../../form/nodes/fields/FieldNode";

export interface RadioWidgetComponentProps {
  widget: RadioAttribute;
  value: boolean;
  field: FieldNode;
  onChange: (value: any) => void;
}

export const RadioWidgetComponent: React.SFC<RadioWidgetComponentProps> = (props) => {
  const value: boolean = props.value || false;

  const renderRadioButton = (isTrue: boolean, label: string) => {
    return (
        <FormGroup check={true}>
          <Label for={props.field.identifier} check={true}>
            <Input
                readOnly={props.field.isReadOnly()}
                onChange={() => props.onChange(isTrue)}
                checked={(isTrue) ? value : !value}
                name={props.field.identifier}
                type="radio"
            />
            {' '}
            {label}
          </Label>
        </FormGroup>
    );
  };

  return (
      <div className="radio-widget">
        <Label for={props.field.identifier} check={true}>{props.field.label}</Label>
        {renderRadioButton(true, props.widget.getTrueLabel())}
        {renderRadioButton(false, props.widget.getFalseLabel())}
      </div>
  );
};