import { AlphaValue } from 'lib/data-types';
import { FunctionalReactiveValue, ReactiveValue } from 'lib/reactive-values';

export function easeInOutSine(
  progress: ReactiveValue<AlphaValue>,
): ReactiveValue<AlphaValue> {
  return new FunctionalReactiveValue([progress], ([progress]) => {
    const x = progress.getValue().getNumber();
    return new AlphaValue(-(Math.cos(Math.PI * x) - 1) / 2);
  });
}
