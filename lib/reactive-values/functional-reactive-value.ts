import { ReactiveValue } from './reactive-value';

export class FunctionalReactiveValue<
  T,
  R extends Iterable<ReactiveValue<any>>,
> extends ReactiveValue<T> {
  private _dependencies: Iterable<ReactiveValue<any>>;
  constructor(dependencies: R, computation: (dependencies: R) => T) {
    super(computation(dependencies));
    this._dependencies = dependencies;

    for (const dependency of dependencies) {
      dependency.subscribe(() => {
        this.value = computation(dependencies);
      });
    }
  }

  public toStringRecursive(): string {
    const rec = Array.from(this._dependencies)
      .map((d) => d.toStringRecursive())
      .join(', ');
    return `Functional(${rec})`;
  }
}
