import { getTypeString } from "../type_checking/type_assertions";
import { isNumberValue } from "../values/values_helpers";

export default class FormState {
  store: Map<string, any>;

  constructor(store?: Map<string, any>) {
    if (!store) {
      store = new Map();
    }

    this.store = store;
  }

  set(identifier: string, value: any): FormState {
    const newStore = new Map(this.store);
    newStore.set(identifier, value);

    return this.instantiate(newStore);
  }

  get(identifier: string): any | null {
    return this.store.get(identifier);
  }

  has(identifier: string): boolean {
    return this.store.has(identifier);
  }

  hasValueFor(identifier: string): boolean {
    if (!this.has(identifier)) {
      return false;
    }

    return typeof this.get(identifier) !== 'undefined' && this.get(identifier) !== null;
  }

  toString() {
    const lines: string[] = [];

    this.store.forEach((value: any, name: string) => {
      lines.push(`${name}: ${value} [${getTypeString(value)}]`);
    });

    return lines.join("\n");
  }

  toJson() {
    const valueMap = {};

    this.store.forEach((value: any, key: string) => {
      if (isNumberValue(value)) {
        valueMap[key] = value.toNumber();
        return;
      }

      valueMap[key] = value;
    });

    return JSON.stringify(valueMap, null, 2);
  }

  public instantiate(newStore?: Map<string, any>): FormState {
    return new FormState(newStore);
  }
}