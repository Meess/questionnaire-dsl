import QuestionStyleNode from "./nodes/children/QuestionStyleNode";
import { makeError } from "../../../form/form_errors";
import StyleSheetNode from "./nodes/StyleSheetNode";

export class StyleError extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, StyleError.prototype);
  }
}

export class InvalidColorError extends StyleError {
  static make(invalidColor: string) {
    const message = `Given value is not a valid color: "${invalidColor}"`;
    return makeError(InvalidColorError, message);
  }
}

// TODO: Currently not used
export class UnknownStyleAttributeNameError extends StyleError {
  static make(invalidAttributeName: string) {
    const message = `Unkown attribute name used: "${invalidAttributeName}"`;
    return makeError(UnknownStyleAttributeNameError, message);
  }
}

export class UnkownQuestionUsedInLayoutError extends StyleError {
  static make(identifier: string) {
    const message = `You used an unkown question identifier in the styling,` +
        `please make sure to reference it in the QL source: "${identifier}"`;
    return makeError(UnkownQuestionUsedInLayoutError, message);
  }
}

export class QuestionPlacedTwiceInLayoutError extends StyleError {
  public questionStyle: QuestionStyleNode;
  public duplicateQuestionStyle: QuestionStyleNode;

  static make(questionStyle: QuestionStyleNode, duplicateQuestionStyle: QuestionStyleNode) {
    const message = `Question ${questionStyle.identifier} was placed twice.`;

    const error = makeError(QuestionPlacedTwiceInLayoutError, message);
    error.questionStyle = questionStyle;
    error.duplicateQuestionStyle = duplicateQuestionStyle;
    return error;
  }
}

export class ExpectedArgumentsError extends StyleError {
  static make(name: string, expectedArguments: number, receivedArguments: number) {
    const message = `${name} expects: ${expectedArguments} ` +
        `argument(s) but got: ${receivedArguments}`;
    return makeError(ExpectedArgumentsError, message);
  }
}

export class ArgumentValueError extends StyleError {
  static make(name: string, expectedArguments: string, receivedArguments: string) {
    const message = `${name} options must be of type ${expectedArguments} ` +
        `but got: ${receivedArguments}`;
    return makeError(ArgumentValueError, message);
  }
}

export class SmallThenError extends StyleError {
  static make(name: string, firstOption: number, secondOption: number) {
    const message = `${firstOption} must be smaller than ${secondOption} `;
    return makeError(SmallThenError, message);
  }
}

export class StyleSheetNeedsAtLeasOnePageError extends StyleError {
  styleSheet: StyleSheetNode;

  static make(styleSheet: StyleSheetNode, message?: string) {
    if (!message) {
      message = `StyleSheet with name ${styleSheet.name} needs at least one page.`;
    }

    const error = makeError(StyleSheetNeedsAtLeasOnePageError, message);
    error.styleSheet = styleSheet;
    return error;
  }
}