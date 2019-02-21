import * as React from 'react';
import TabContent from "reactstrap/lib/TabContent";
import TabPane from "reactstrap/lib/TabPane";
import Input from "reactstrap/lib/Input";
import Label from "reactstrap/lib/Label";
import constants from "../../../config/constants";

export interface ModuleTabContentProps {
  activeTab: string;
  onChangeQl: (source: string) => void;
  onChangeQls: (source: string) => void;
  qlInput: string;
  qlsInput: string;
  qlsEnabled: boolean;
  toggleQls: (enabled: boolean) => void;
  error: Error | null;
}

export const ModuleTabsContent: React.SFC<ModuleTabContentProps> = (props) => {
  const hasError = props.error !== null;

  return (
      <TabContent activeTab={props.activeTab}>
        <TabPane tabId={constants.APP_MODULE_TABS.QL}>
          <Input
              valid={!hasError}
              type="textarea"
              value={props.qlInput}
              onChange={e => props.onChangeQl(e.target.value)}
              name="ql_input"
          />
        </TabPane>
        <TabPane tabId={constants.APP_MODULE_TABS.QLS}>
          <Label check={true}>
            <Input
                type="checkbox"
                checked={props.qlsEnabled}
                onChange={e => props.toggleQls(e.target.checked)}
            />{' '}
            Enable QLS
          </Label>
          <Input
              valid={!hasError}
              type="textarea"
              disabled={!props.qlsEnabled}
              value={props.qlsInput}
              onChange={e => props.onChangeQls(e.target.value)}
              name="ql_input"
          /> </TabPane>
      </TabContent>
  );
};