import ExpressionVisitor from "../visitors/ExpressionVisitor";
import AbstractLiteral from "./AbstractLiteral";
import * as moment from "moment";
import { ValueIsInvalidDateError } from "../../form_errors";
import constants from "../../../config/constants";

export default class DateLiteral extends AbstractLiteral {
  private value: Date;

  static fromString(value: string) {
    const date = moment(value, constants.DEFAULT_DATE_FORMAT);

    if (!date.isValid()) {
      throw ValueIsInvalidDateError.make(value);
    }

    return new DateLiteral(date.toDate());
  }

  constructor(value: Date) {
    super();
    this.value = value;
  }

  accept(visitor: ExpressionVisitor): any {
    return visitor.visitDateLiteral(this);
  }

  getValue(): Date {
    return this.value;
  }
}