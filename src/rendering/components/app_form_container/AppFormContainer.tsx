import * as React from 'react';
import QlsForm from "../../../modules/styling/form/QlsForm";
import QlForm from "../../../form/QlForm";
import { QlsFormComponent } from "../../../modules/styling/rendering/components/qls_form_component/QlsFormComponent";
import { QlFormComponent } from "../ql_form_component/QlFormComponent";
import VisibleFieldsVisitor from "../../../form/evaluation/VisibleFieldsVisitor";
import PageNode from "../../../modules/styling/form/nodes/containers/PageNode";

export interface AppFormContainerProps {
  form: QlForm | QlsForm | any | null;
  qlsEnabled: boolean;
  onChangeAnswer: (identifier: string, value: any) => void;
  onChangePage: (nextPage: PageNode) => void;
}

export const AppFormContainer: React.SFC<AppFormContainerProps> = (props) => {
  const renderFormComponent = () => {
    if (!props.form) {
      return (
          <span>Form not yet parsed</span>
      );
    }

    const visibleFields: Set<string> = VisibleFieldsVisitor.run(props.form);

    if (props.qlsEnabled) {
      return (
          <QlsFormComponent
              onChange={props.onChangeAnswer}
              onChangePage={props.onChangePage}
              form={props.form}
              visibleFields={visibleFields}
          />
      );
    }

    return (
        <QlFormComponent
            onChange={props.onChangeAnswer}
            form={props.form}
            visibleFields={visibleFields}
        />
    );
  };

  return (
      <div className="app-form-container">
        {renderFormComponent()}
      </div>
  );
};