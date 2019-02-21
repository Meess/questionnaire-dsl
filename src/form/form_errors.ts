import { getTypeString } from "./type_checking/type_assertions";
import { FieldType } from "./FieldType";
import FieldNode from "./nodes/fields/FieldNode";
import Expression from "./nodes/expressions/Expression";
import NodeLocation from "./nodes/location/NodeLocation";
import VariableIdentifier from "./nodes/expressions/VariableIdentifier";
import { Maybe } from "../helpers/type_helper";
import TreeNode from "./nodes/TreeNode";

export class FormError extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, FormError.prototype);
  }
}

export const makeError = <T extends Error>(errorClass: { new(name: string): T; }, message: string): T => {
  const error = new errorClass(message);
  Object.setPrototypeOf(error, errorClass.prototype);
  return error;
};

export class TypeCheckError extends FormError {
  expectedType: string;
  receivedType: string;
  node: Maybe<TreeNode>;
  location: Maybe<NodeLocation>;

  static make(expectedType: string, receivedType: string, node?: TreeNode, message?: string) {
    if (!message) {
      message = `Type check failed. Expected "${expectedType}" but received "${receivedType}".`;
    }

    const error = makeError(TypeCheckError, message);
    error.expectedType = expectedType;
    error.receivedType = receivedType;
    error.node = node;

    return error;
  }
}

export class ValuesNotComparableError extends FormError {
  left: any;
  right: any;
  node: Maybe<TreeNode>;
  location: NodeLocation;

  static make(left: string, right: string, node?: TreeNode, message?: string) {
    if (!message) {
      message = `Cannot compare ${left} [${getTypeString(left)}] to  ${right} [${getTypeString(right)}].`;
    }

    const error = makeError(ValuesNotComparableError, message);
    error.left = left;
    error.right = right;
    error.node = node;

    return error;
  }
}

export class TypesNotComparableError extends FormError {
  left: FieldType;
  right: FieldType;
  node: Maybe<TreeNode>;

  static make(left: FieldType, right: FieldType, node?: TreeNode, message?: string) {
    if (!message) {
      message = `Cannot compare type ${left} to  ${right}.`;
    }

    const error = makeError(TypesNotComparableError, message);
    error.left = left;
    error.right = right;
    error.node = node;

    return error;
  }
}

export class DivisionByZeroError extends FormError {
  static make(message?: string) {
    if (!message) {
      message = `Division by zero is not possible. `;
    }

    return makeError(DivisionByZeroError, message);
  }
}

// TODO: Should be removed when not called #NoDeadCode
export class NotImplementedYetError extends Error {
  static make(feature: string, message?: string) {
    if (!message) {
      message = `Feature not implemented yet: "${feature}".`;
    }

    return new NotImplementedYetError(message);
  }
}

export class UnkownFieldError extends FormError {
  fieldIdentifier: string;

  static make(identifier: string, message?: string) {
    if (!message) {
      message = `Unkown field ${identifier}.`;
    }

    const error = makeError(UnkownFieldError, message);
    error.fieldIdentifier = identifier;
    return error;
  }
}

export class UnkownVariableIdentifierError extends FormError {
  node: VariableIdentifier;

  static make(identifier: VariableIdentifier, message?: string) {
    if (!message) {
      message = `Unkown variable identifier: "${identifier}"`;
    }

    const error = makeError(UnkownVariableIdentifierError, message);
    error.node = identifier;
    return error;
  }
}

export class UnkownDefaultValueError extends FormError {
  fieldType: string;

  static make(type: FieldType, message?: string) {
    if (!message) {
      message = `No default value for type: "${type}"`;
    }

    const error = makeError(UnkownDefaultValueError, message);
    error.fieldType = type;
    return error;
  }
}

export class EmptyVariableScopeStackError extends FormError {
  identifier: string;

  static make(identifier: string, message?: string) {
    if (!message) {
      message = `Cannot add variable ${identifier} to empty stack.`;
    }

    const error = makeError(EmptyVariableScopeStackError, message);
    error.identifier = identifier;
    return error;
  }
}

export class FieldAlreadyDeclaredError extends FormError {
  field: FieldNode;

  static make(field: FieldNode, message?: string) {
    if (!message) {
      message = `Field "${field.identifier}" was already declared before. Please use another name.`;
    }

    const error = makeError(FieldAlreadyDeclaredError, message);
    error.field = field;
    return error;
  }
}

export class VariableNotInScopeError extends FormError {
  identifier: string;
  node: Expression;

  static make(expression: Expression, identifier: string, message?: string) {
    if (!message) {
      message = `Unknown identifier "${identifier}" used in expression.`;
    }

    const error = makeError(VariableNotInScopeError, message);
    error.identifier = identifier;
    error.node = expression;
    return error;
  }
}

export class ValueIsNaNError extends FormError {
  value: any;

  static make(value: any, message?: string) {
    if (!message) {
      message = `Value cannot be parsed as a number: ${value}.`;
    }
    const error = makeError(ValueIsNaNError, message);
    error.value = value;
    return error;
  }
}

export class CannotFindCommonFieldTypeError extends FormError {
  left: FieldType;
  right: FieldType;

  static make(left: FieldType, right: FieldType, message?: string) {
    if (!message) {
      message = `Cannot find common field type for ${left} and ${right}.`;
    }

    const error = makeError(CannotFindCommonFieldTypeError, message);
    error.left = left;
    error.right = right;
    return error;
  }
}

export class ValueIsInvalidDateError extends FormError {
  value: string;

  static make(value: string, message?: string) {
    if (!message) {
      message = `Cannot parse date since it is invalid ${value}.`;
    }

    const error = makeError(ValueIsInvalidDateError, message);
    error.value = value;
    return error;
  }
}

export class NeedAtLeastOneFormToParseError extends FormError {
  static make(message?: string) {
    if (!message) {
      message = `The given input can not be parsed since there must be at least one form in the input.`;
    }

    return makeError(NeedAtLeastOneFormToParseError, message);
  }
}