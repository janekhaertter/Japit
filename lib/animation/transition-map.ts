import { SimpleWrappedReactiveValue } from 'lib/reactive-values';

import { Transition } from './transition';

/**
 * This map interface ensures that if a key is of type `WrappedReactiveValue<T>`, the corresponding value is of type `Transition<T>`. The type parameter `T` may thus vary for different keys while still providing type guarantees.
 */
export interface TransitionMap {
  clear(): void;
  delete<T>(key: SimpleWrappedReactiveValue<T>): boolean;
  forEach(
    callbackfn: <T>(
      value: Transition<T>,
      key: SimpleWrappedReactiveValue<T>,
      map: TransitionMap,
    ) => void,
    thisArg?: any,
  ): void;
  get<T>(key: SimpleWrappedReactiveValue<T>): Transition<T> | undefined;
  has<T>(key: SimpleWrappedReactiveValue<T>): boolean;
  set<T>(key: SimpleWrappedReactiveValue<T>, value: Transition<T>): this;
  readonly size: number;
  keys(): IterableIterator<SimpleWrappedReactiveValue<any>>;
}
