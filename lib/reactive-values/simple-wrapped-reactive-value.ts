import { ReactiveValue } from './reactive-value';
import { WrappedReactiveValue } from './wrapped-reactive-value';

export class SimpleWrappedReactiveValue<T> extends WrappedReactiveValue<
  T,
  ReactiveValue<T>
> {}
