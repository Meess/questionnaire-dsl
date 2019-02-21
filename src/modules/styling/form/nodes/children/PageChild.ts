import StyleTreeNode from "../StyleTreeNode";
import SectionNode from "../containers/SectionNode";

export default interface PageChild extends StyleTreeNode {
  isSection(): this is SectionNode;
  isRendered(): boolean;
}