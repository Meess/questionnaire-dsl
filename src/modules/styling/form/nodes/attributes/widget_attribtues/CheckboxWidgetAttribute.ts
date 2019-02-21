import { CheckboxWidgetComponent } from "../../../../rendering/components/widgets/CheckboxWidgetComponent";
import BooleanWidgetAttribute from "./BooleanWidgetAttribute";

export default class CheckboxWidgetAttribute extends BooleanWidgetAttribute {
  validate() {
    return;
  }

  getRenderComponent() {
    return CheckboxWidgetComponent;
  }

  getValue(): string {
    return "checkbox";
  }
}
