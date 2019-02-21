import WidgetAttribute from "../WidgetAttribute";

export default abstract class BooleanWidgetAttribute extends WidgetAttribute {
  getTrueLabel(): string {
    return (this.options && this.options.length >= 1) ? this.options[0] : 'True';
  }

  getFalseLabel(): string {
    return (this.options && this.options.length >= 2) ? this.options[1] : 'False';
  }
}