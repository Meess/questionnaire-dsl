import * as React from 'react';
import { getParserErrorMessage } from "../../../parsing/parsing_helpers";
import Alert from "reactstrap/lib/Alert";

export interface AppErrorMessageProps {
  error: Error | null;
}

export const AppErrorMessage: React.SFC<AppErrorMessageProps> = (props) => {
  if (!props.error) {
    return null;
  }

  return (
      <Alert color="danger">
        {getParserErrorMessage(props.error)}
      </Alert>
  );
};