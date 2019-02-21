import { cloneArray } from "../../helpers/array_helpers";

export default class GenericCollection<E> {
  private list: Set<E> = new Set();

  constructor(elements: E[] = []) {
    this.add = this.add.bind(this);

    this.addMany(elements);
  }

  add(element: E) {
    this.list.add(element);
  }

  addMany(elements: E[]) {
    elements.forEach(this.add);
  }

  forEach(callback: (element: E) => void): void {
    this.list.forEach(element => callback(element));
  }

  toArray(): E[] {
    return cloneArray(Array.from(this.list));
  }
}