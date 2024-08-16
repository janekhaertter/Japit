import { AlphaValue } from 'lib/data-types';
import { ReactiveValue } from 'lib/reactive-values';

export type Interpolation<T> = (
  from: ReactiveValue<T>,
  to: ReactiveValue<T>,
  progress: ReactiveValue<AlphaValue>,
) => ReactiveValue<T>;
