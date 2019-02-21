import * as React from 'react';
import { getParserErrorMessage } from "../../../parsing/parsing_helpers";
import Alert from "reactstrap/lib/Alert";
import { FormWarning } from "../../../form/form_warnings";

export interface AppWarningMessagesProps {
  warnings: FormWarning[];
}

export const AppWarningMessages: React.SFC<AppWarningMessagesProps> = (props) => {
  if (props.warnings.length === 0) {
    return null;
  }

  const texts = props.warnings.map(warning => getParserErrorMessage(warning));

  return (
      <Alert color="warning">
        {texts.join(' ')}
      </Alert>
  );
};