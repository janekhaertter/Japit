import { ReactiveValue } from './reactive-value';

export class PrimitiveReactiveValue<T> extends ReactiveValue<T> {
  constructor(value: T) {
    super(value);
  }

  public setValue(value: T): void {
    this.value = value;
  }

  public toStringRecursive(): string {
    return `Primitive(${this.value})`;
  }
}
