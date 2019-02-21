import * as React from 'react';
import PageNode from "../../../form/nodes/containers/PageNode";
import SectionNode from "../../../form/nodes/containers/SectionNode";
import { SectionComponent } from "../section_component/SectionComponent";

export interface QlsPageProps {
  page?: PageNode;
  renderField: (identifier: string) => any;
}

export const QlsPage: React.SFC<QlsPageProps> = (props) => {
  if (!props.page) {
    return null;
  }

  const renderSections = (sections: SectionNode[]) => {
    return sections.map(section => {
      return (
          <SectionComponent
              key={section.name}
              sectionNode={section}
              renderField={props.renderField}
          />
      );
    });
  };

  return (
      <div className="questionnaire-page">
        {renderSections(props.page.getFirstLevelSections())}
      </div>
  );
};