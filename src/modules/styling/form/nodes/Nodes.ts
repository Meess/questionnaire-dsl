import StyleSheetNode from "./StyleSheetNode";
import BaseAttribute from "./attributes/BaseAttribute";
import Page from "./containers/PageNode";
import Section from "./containers/SectionNode";
import WidgetAttribute from "./attributes/WidgetAttribute";
import QuestionStyleNode from "./children/QuestionStyleNode";
import DefaultStyle from "./children/DefaultStyleNode";
import DropdownWidgetAttribute from "./attributes/widget_attribtues/DropdownWidgetAttribute";
import SliderWidgetAttribute from "./attributes/widget_attribtues/SliderWidgetAttribute";
import CheckboxWidgetAttribute from "./attributes/widget_attribtues/CheckboxWidgetAttribute";
import BooleanWidgetAttribute from "./attributes/widget_attribtues/BooleanWidgetAttribute";
import RadioWidgetAttribute from "./attributes/widget_attribtues/RadioWidgetAttribute";
import SpinBoxWidgetAttribute from "./attributes/widget_attribtues/SpinBoxWidgetAttribute";
import TextWidgetAttribute from "./attributes/widget_attribtues/TextWidgetAttribute";
import ColorAttribute from "./attributes/base_attributes/ColorAttribute";
import WidthAttribute from "./attributes/base_attributes/WidthAttribute";
import FontSizeAttribute from "./attributes/base_attributes/FontSizeAttribute";
import FontAttribute from "./attributes/base_attributes/FontAttribute";

/**
 * List all available node types for easy access in the grammar.
 * This list is not needed otherwise, but used to create according
 * instances inside the parser.
 */
export default {
  Stylesheet: StyleSheetNode,
  BaseAttribute,
  WidgetAttribute,
  Page,
  Section,
  QuestionStyle: QuestionStyleNode,
  DefaultStyle,
  DropdownWidgetAttribute,
  CheckboxWidgetAttribute,
  SliderWidgetAttribute,
  BooleanWidgetAttribute,
  RadioWidgetAttribute,
  SpinBoxWidgetAttribute,
  TextWidgetAttribute,
  ColorAttribute,
  WidthAttribute,
  FontSizeAttribute,
  FontAttribute
};
