import { ReactiveValue, ensureReactive } from 'lib/reactive-values';

import { RequestFunction } from './request-function';

export function ensureRequestFunction<T, Q>(
  value: T,
): T extends RequestFunction<unknown>
  ? T
  : T extends ReactiveValue<Q>
    ? RequestFunction<Q>
    : RequestFunction<T> {
  // helper type
  type HelperType<T, Q> =
    T extends RequestFunction<unknown>
      ? T
      : T extends ReactiveValue<Q>
        ? RequestFunction<Q>
        : RequestFunction<T>;

  if (typeof value === 'function') {
    return value as HelperType<T, Q>;
  }

  const res = ensureReactive(value);

  return ((_) => res) as HelperType<T, Q>;
}
