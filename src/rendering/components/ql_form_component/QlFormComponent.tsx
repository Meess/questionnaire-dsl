import * as React from 'react';
import Form from "../../../form/StatefulForm";
import { FieldContainer } from "../field_container/FieldContainer";
import Field from "../../../form/nodes/fields/FieldNode";

export interface QlFormComponentProps {
  form: Form;
  onChange: (identifier: string, value: any) => void;
  visibleFields: Set<string>;
  renderField?: (field: Field) => any;
}

export const QlFormComponent: React.SFC<QlFormComponentProps> = (props) => {
  const onChange = (identifier: string) => (value: any): void => {
    props.onChange(identifier, value);
  };

  const renderFields = () => {
    return props.form.getFields().map((field: Field) => {
      if (!props.visibleFields.has(field.identifier)) {
        return null;
      }

      if (props.renderField) {
        return props.renderField(field);
      }

      return (
          <FieldContainer
              onChange={onChange(field.identifier)}
              key={field.identifier}
              field={field}
              value={props.form.getState().get(field.identifier)}
          />);
    });
  };

  return (
      <div className="ql-form">
        <h1>Form ({props.form.getName()})</h1>
        {renderFields()}
      </div>
  );
};