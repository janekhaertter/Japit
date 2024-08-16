import { ReactiveValue, ReactiveValueHandler } from './reactive-value';

export class WrappedReactiveValue<
  T,
  R extends ReactiveValue<T>,
> extends ReactiveValue<T> {
  protected _wrappedValue: R;

  private _changeCallback: ReactiveValueHandler<T> = (value) => {
    this.value = value;
  };

  constructor(reactiveValue: R) {
    super(reactiveValue.getValue());

    this._wrappedValue = reactiveValue;
    this.wrap(reactiveValue);
  }

  public wrap(reactiveValue: R): void {
    this._wrappedValue.unsubscribe(this._changeCallback);
    this._wrappedValue = reactiveValue;

    this.value = reactiveValue.getValue();
    this._wrappedValue.subscribe(this._changeCallback);
  }

  public unwrap(): R {
    return this._wrappedValue;
  }

  public toStringRecursive(): string {
    return `Wrapped(${this._wrappedValue.toStringRecursive()})`;
  }
}
