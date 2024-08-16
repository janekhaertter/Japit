import { AlphaValue } from 'lib/data-types';
import { ReactiveValue } from 'lib/reactive-values';

export function easeLinear(
  progress: ReactiveValue<AlphaValue>,
): ReactiveValue<AlphaValue> {
  return progress;
}
