import { VariableScopeResult, VariableScopeVisitor } from "../../form/type_checking/VariableScopeVisitor";
import {
  nestedForm, nestedFormFieldDeclaredTwice, nestedFormScopeFlawed1,
  nestedFormScopeFlawed2, nestedFormScopeFlawed3
} from "../data/test_scope_forms";
import { FieldAlreadyDeclaredError, VariableNotInScopeError } from "../../form/form_errors";

it('does not create an error for the variable scopes of a correct form', () => {
  const result: VariableScopeResult = VariableScopeVisitor.run(nestedForm);

  const identifiers = Array.from(result.variables.keys()).sort();

  expect(identifiers).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'x', 'y']);
});

it('does not allow a second declaration of a field', () => {
  const visitor = new VariableScopeVisitor();

  expect(() => {
    nestedFormFieldDeclaredTwice.accept(visitor);
  }).toThrow(FieldAlreadyDeclaredError);
});

const expectVariableNotInScope = (expectedIdentifier: string, action: () => void) => {
  let error: any = null;

  try {
    action();
  } catch (_error) {
    error = _error;
  }

  expect(error).toBeInstanceOf(VariableNotInScopeError);

  if (error && error instanceof VariableNotInScopeError) {
    expect(error.identifier).toBe(expectedIdentifier);
  }
};

it('does not allow usage of undeclared variable', () => {
  const visitor = new VariableScopeVisitor();
  expectVariableNotInScope("b", () => nestedFormScopeFlawed1.accept(visitor));
});

it('does not allow usage of variable in deeper scope', () => {
  const visitor = new VariableScopeVisitor();
  expectVariableNotInScope("x", () => nestedFormScopeFlawed2.accept(visitor));
});

it('does not allow usage of variable in earlier scope', () => {
  const visitor = new VariableScopeVisitor();
  expectVariableNotInScope("a", () => nestedFormScopeFlawed3.accept(visitor));
});