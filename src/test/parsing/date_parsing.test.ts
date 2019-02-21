import { getFirstStatement } from "./parsing_test_helpers";
import ComputedField from "../../form/nodes/fields/ComputedFieldNode";
import DateLiteral from "../../form/nodes/literals/DateLiteral";
import * as moment from "moment";
import { ValueIsInvalidDateError } from "../../form/form_errors";

it("does parse valid dates", () => {
  const input = `form dateExample {
                    "Some example date"
                      dateVariable: date = (11.12.1991)
                 }`;

  let computedField: any = null;

  expect(() => {
    computedField = getFirstStatement(input);
  }).not.toThrow(Error);

  expect(computedField).toBeInstanceOf(ComputedField);
  expect(computedField.formula).toBeInstanceOf(DateLiteral);

  const dateField: DateLiteral = computedField.formula;
  expect(dateField.getValue()).toEqual(moment("11.12.1991", "DD.MM.YYYY").toDate());
});

it("does not parse invalid dates", () => {
  const input = `form dateExample {
                    "Some example date"
                      dateVariable: date = (11.30.1991)
                 }`;

  let computedField: any = null;

  expect(() => {
    computedField = getFirstStatement(input);
  }).toThrow(ValueIsInvalidDateError);
});