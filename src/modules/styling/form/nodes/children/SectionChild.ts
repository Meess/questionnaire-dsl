import StyleTreeNode from "../StyleTreeNode";
import SectionNode from "../containers/SectionNode";
import QuestionStyleNode from "./QuestionStyleNode";

export default interface SectionChild extends StyleTreeNode {
  isSection(): this is SectionNode;

  isQuestionStyle(): this is QuestionStyleNode;

  isRendered(): boolean;
}