import { RadioWidgetComponent } from "../../../../rendering/components/widgets/RadioWidgetComponent";
import BooleanWidgetAttribute from "./BooleanWidgetAttribute";

export default class RadioWidgetAttribute extends BooleanWidgetAttribute {
  validate() {
    return;
  }

  getValue(): string {
    return "radio";
  }

  getRenderComponent() {
    return RadioWidgetComponent;
  }
}
