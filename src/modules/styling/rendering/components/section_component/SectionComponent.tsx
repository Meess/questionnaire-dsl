import * as React from 'react';
import SectionNode from "../../../form/nodes/containers/SectionNode";
import SectionChild from "../../../form/nodes/children/SectionChild";

export interface SectionComponentProps {
  sectionNode: SectionNode;
  renderField: (identifier: string) => any;
}

export const SectionComponent: React.SFC<SectionComponentProps> = (props) => {
  const renderChildren = (children: SectionChild[]) => {
    return children.map((child, index) => {
      if (!child.isRendered()) {
        return null;
      }

      if (child.isSection()) {
        return (
            <SectionComponent
                key={child.name}
                sectionNode={child}
                renderField={props.renderField}
            />);
      }

      if (child.isQuestionStyle()) {
        return props.renderField(child.identifier);
      }

      return (
          <div key={index}>Warning! Cannot render section child</div>
      );
    });
  };

  return (
      <fieldset className="questionnaire-section form-group">
        <legend>{props.sectionNode.name}</legend>
        {renderChildren(props.sectionNode.body)}
      </fieldset>
  );
};