import Expression from "../nodes/expressions/Expression";
import FormState from "../state/FormState";
import EvaluationVisitor from "./EvaluationVisitor";
import { getUsedVariableIdentifiers } from "../../helpers/form_helpers";

/**
 * Alias to evaluate a form using the EvaluationVisitor
 *
 * @param {Expression} expression
 * @param state
 * @returns {any}
 */
export const evaluate = (expression: Expression, state?: FormState): any => {
  const evaluationVisitor = new EvaluationVisitor(state);
  return expression.accept(evaluationVisitor);
};

/**
 * Check if an expression can be evaluated. Only returns true if all
 * necessary values that are connected to variable identifiers are
 * in the form state.
 *
 * @param {Expression} expression
 * @param {FormState} state
 * @returns {boolean}
 */
export const canBeEvaluated = (expression: Expression, state: FormState) => {
  const variables = getUsedVariableIdentifiers(expression);
  const missingVariables = variables.filter(variableName => !state.hasValueFor(variableName));

  return missingVariables.length === 0;
};