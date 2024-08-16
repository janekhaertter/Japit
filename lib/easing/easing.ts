import { AlphaValue } from 'lib/data-types';
import { ReactiveValue } from 'lib/reactive-values';

export type Easing = (
  progress: ReactiveValue<AlphaValue>,
) => ReactiveValue<AlphaValue>;
