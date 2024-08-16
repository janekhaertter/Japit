// We need the extra type parameter R to ensure that T is 'upward-compatible'. Otherwise,
// ```
// function(value: RectiveValue<number>) {
//   const a: ReactiveValue<number | undefined> = value;
// }
// ```
// would fail as value of type ReactiveValue<number> is not assignable to a of type ReactiveValue<number | undefined>.
export type ReactiveValueHandler<T> = <R extends T>(value: R) => void;

export abstract class ReactiveValue<T> {
  protected _onChangeHandlers: Set<ReactiveValueHandler<T>> = new Set();
  private _value: T;

  constructor(startingValue: T) {
    this._value = startingValue;
  }

  protected get value(): T {
    return this._value;
  }

  protected set value(value: T) {
    if (this._value !== value) {
      this._value = value;
      this._onChangeHandlers.forEach((handler) => handler(value));
    }
  }

  public getValue(): T {
    return this._value;
  }

  public subscribe(eventHandler: ReactiveValueHandler<T>): void {
    this._onChangeHandlers.add(eventHandler);
  }

  public unsubscribe(eventHandler: ReactiveValueHandler<T>): void {
    this._onChangeHandlers.delete(eventHandler);
  }

  public abstract toStringRecursive(): string;
}
