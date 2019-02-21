import WidgetAttribute from "../WidgetAttribute";
import { SpinboxWidgetComponent } from "../../../../rendering/components/widgets/SpinboxWidgetComponent";

// spinbox (for numbers)
export default class SpinBoxWidgetAttribute extends WidgetAttribute {
  validate() {
    return;
  }

  getRenderComponent() {
    return SpinboxWidgetComponent;
  }

  getValue(): string {
    return "spinbox";
  }
}
