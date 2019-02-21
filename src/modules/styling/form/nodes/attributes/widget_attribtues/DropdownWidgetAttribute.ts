import { DropdownWidgetComponent } from "../../../../rendering/components/widgets/DropdownWidgetComponent";
import BooleanWidgetAttribute from "./BooleanWidgetAttribute";

export default class DropdownWidgetAttribute extends BooleanWidgetAttribute {
  validate() {
    return;
  }

  getValue(): string {
    return "dropdown";
  }

  getRenderComponent() {
    return DropdownWidgetComponent;
  }

}
