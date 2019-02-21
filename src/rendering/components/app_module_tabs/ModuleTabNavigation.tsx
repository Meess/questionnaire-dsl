import * as React from 'react';
import Nav from "reactstrap/lib/Nav";
import NavItem from "reactstrap/lib/NavItem";
import NavLink from "reactstrap/lib/NavLink";
import * as classnames from 'classnames';
import constants from "../../../config/constants";

export interface ModuleTabsProps {
  activeTab: string;
  onChange: (nextTab: string) => void;
  qlsEnabled: boolean;
}

export const ModuleTabNavigation: React.SFC<ModuleTabsProps> = (props) => {
  return (
      <Nav tabs={true}>
        <NavItem>
          <NavLink
              className={classnames({active: props.activeTab === constants.APP_MODULE_TABS.QL})}
              onClick={() => props.onChange(constants.APP_MODULE_TABS.QL)}
          >
            QL (Form)
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
              className={classnames({active: props.activeTab === constants.APP_MODULE_TABS.QLS})}
              onClick={() => props.onChange(constants.APP_MODULE_TABS.QLS)}
          >
            QLS (Style - {(props.qlsEnabled) ? 'enabled' : 'disabled'})
          </NavLink>
        </NavItem>
      </Nav>
  );
};