import NumberValue from "./NumberValue";

export default class NumericOperation {
  private right: NumberValue;
  private left: NumberValue;

  static make(left: NumberValue, right: NumberValue): NumericOperation {
    return new NumericOperation(left, right);
  }

  constructor(left: NumberValue, right: NumberValue) {
    this.left = left;
    this.right = right;
  }

  public add(): NumberValue {
    const {left, right} = this.getOperands();
    return left.add(right);
  }

  public subtract(): NumberValue {
    const {left, right} = this.getOperands();
    return left.minus(right);
  }

  public multiply(): NumberValue {
    const {left, right} = this.getOperands();
    return left.multiply(right);
  }

  public divide(): NumberValue {
    const {left, right} = this.getOperands();
    return left.divide(right);
  }

  public equals(): boolean {
    const {left, right} = this.getOperands();
    return left.equals(right);
  }

  public notEqual(): boolean {
    const {left, right} = this.getOperands();
    return left.equals(right) === false;
  }

  public smallerThan(): boolean {
    const {left, right} = this.getOperands();
    return left.smallerThan(right);
  }

  public smallerThanOrEqual(): boolean {
    const {left, right} = this.getOperands();
    return left.smallerThan(right) || left.equals(right);
  }

  public largerThan(): boolean {
    const {left, right} = this.getOperands();
    return left.largerThan(right);
  }

  public largerThanOrEqual(): boolean {
    const {left, right} = this.getOperands();
    return left.largerThan(right) || left.equals(right);
  }

  public getOperands() {
    if (this.right.hasHigherPriorityThan(this.left)) {
      return {left: this.right.convert(this.left), right: this.right};
    }

    const right = this.left.convert(this.right);
    return {left: this.left, right: right};
  }
}