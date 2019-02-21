import WidgetAttribute from "../WidgetAttribute";
import { SliderWidgetComponent } from "../../../../rendering/components/widgets/SliderWidgetComponent";
import { ArgumentValueError, ExpectedArgumentsError, SmallThenError } from "../../../style_errors";
import { stringIsNumeric } from "../../../../../../helpers/type_helper";

export default class SliderWidgetAttribute extends WidgetAttribute {

  validate() {
    if (!this.options) {
      return;
    }

    if (this.options.length !== 2) {
      throw ExpectedArgumentsError.make(this.getValue(), 2, this.options.length);
    }

    this.options.forEach(option => {
      if (!stringIsNumeric(option)) {
        throw ArgumentValueError.make(this.getValue(), "Integer", option);
      }
    });

    if (this.getMinimum() > this.getMaximum()) {
      throw SmallThenError.make(this.getValue(), this.getMinimum(), this.getMaximum());
    }
  }

  getValue(): string {
    return "slider widget";
  }

  getRenderComponent() {
    return SliderWidgetComponent;
  }

  getMinimum(): number {
    return (this.options && this.options.length === 2) ? parseInt(this.options[0], 10) : 0;
  }

  getMaximum(): number {
    return (this.options && this.options.length === 2) ? parseInt(this.options[1], 10) : 100;
  }
}
