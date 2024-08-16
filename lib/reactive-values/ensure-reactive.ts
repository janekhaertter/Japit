import { PrimitiveReactiveValue } from './primitive-reactive-value';
import { ReactiveValue } from './reactive-value';

export function ensureReactive<T>(
  value: T,
): T extends ReactiveValue<unknown> ? T : PrimitiveReactiveValue<T> {
  // helper type
  type WrappedReactiveValue<T> =
    T extends ReactiveValue<unknown> ? T : PrimitiveReactiveValue<T>;

  if (value instanceof ReactiveValue) {
    return value as WrappedReactiveValue<T>;
  }

  return new PrimitiveReactiveValue(value) as WrappedReactiveValue<T>;
}
