import { Easing } from 'lib/easing';
import { Interpolation } from 'lib/interpolation';
import { ReactiveValue } from 'lib/reactive-values';

export type Transition<T> = {
  to: ReactiveValue<T>;
  easing: Easing;
  interpolation: Interpolation<T>;
};
