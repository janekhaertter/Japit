import { ReactiveValue, SimpleWrappedReactiveValue } from 'lib/reactive-values';

/**
 * This map interface ensures that if a key is of type {@link WrappedReactiveValue<T>}, the corresponding value is of type {@link ReactiveValue<T>}. The type parameter `T` may thus vary for different keys while still providing type guarantees.
 */
export interface UpdatedValuesMap {
  clear(): void;
  delete<T>(key: SimpleWrappedReactiveValue<T>): boolean;
  forEach(
    callbackfn: <T>(
      value: ReactiveValue<T>,
      key: SimpleWrappedReactiveValue<T>,
      map: UpdatedValuesMap,
    ) => void,
    thisArg?: any,
  ): void;
  get<T>(key: SimpleWrappedReactiveValue<T>): ReactiveValue<T> | undefined;
  has<T>(key: SimpleWrappedReactiveValue<T>): boolean;
  set<T>(key: SimpleWrappedReactiveValue<T>, value: ReactiveValue<T>): this;
  readonly size: number;
  keys(): IterableIterator<SimpleWrappedReactiveValue<any>>;
}

Map;
