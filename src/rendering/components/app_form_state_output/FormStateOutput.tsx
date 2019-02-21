import * as React from 'react';
import Button from "reactstrap/lib/Button";
import Input from "reactstrap/lib/Input";
import Form from "../../../form/StatefulForm";
import ButtonGroup from "reactstrap/lib/ButtonGroup";

export interface FormStateOutputProps {
  form?: Form;
  onReset: () => void;
}

export const AppFormStateOutput: React.SFC<FormStateOutputProps> = (props) => {
  if (!props.form) {
    return null;
  }

  const onExportState = () => {
    if (!props.form) {
      return;
    }

    const json: string = props.form.getState().toJson();
    require("downloadjs")(json, `${props.form.getName()}_${Math.round(Date.now())}`, "application/json");
  };

  const inputValue = (props.form !== null) ? props.form.getState().toString() : '';

  return (
      <div className="state-output-container">
        <div className="row">
          <div className="col-md-8">
            <h2>State</h2>
          </div>
          <div className="col-md-4">
            <ButtonGroup>
              <Button color="secondary" onClick={() => props.onReset()}>Reset</Button>
              <Button color="primary" onClick={() => onExportState()}>Export</Button>
            </ButtonGroup>
          </div>
        </div>
        <Input
            type="textarea"
            readOnly={true}
            value={inputValue}
        />
      </div>
  );
};