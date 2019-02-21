import StyleTreeNode from "../form/nodes/StyleTreeNode";
import DefaultStyle from "../form/nodes/children/DefaultStyleNode";
import StyleFilterVisitor from "../form/visitors/StyleFilterVisitor";
import QuestionStyleNode from "../form/nodes/children/QuestionStyleNode";

export const getDefaultStyleNodes = (container: StyleTreeNode): DefaultStyle[] => {
  const visitor = new StyleFilterVisitor({
    includeQuestions: false,
    includeDefaults: true,
    recursive: false
  });

  return container.accept(visitor);
};

export const getQuestionStyleNodes = (container: StyleTreeNode, recursive: boolean = false): QuestionStyleNode[] => {
  const visitor = new StyleFilterVisitor({
    includeQuestions: true,
    includeDefaults: false,
    recursive: recursive
  });
  return container.accept(visitor);
};