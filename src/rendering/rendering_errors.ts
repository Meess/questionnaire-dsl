import { FieldType } from "../form/FieldType";

export class CannotRenderFieldType extends Error {
  static make(formType?: FieldType) {
    const error = new CannotRenderFieldType(`Cannot render form type: ${formType}`);
    Object.setPrototypeOf(error, CannotRenderFieldType.prototype);
    return error;
  }
}