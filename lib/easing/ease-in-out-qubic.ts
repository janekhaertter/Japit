import { AlphaValue } from 'lib/data-types';
import { FunctionalReactiveValue, ReactiveValue } from 'lib/reactive-values';

export function easeInOutQubic(
  progress: ReactiveValue<AlphaValue>,
): ReactiveValue<AlphaValue> {
  return new FunctionalReactiveValue([progress], ([progress]) => {
    const x = progress.getValue().getNumber();
    return new AlphaValue(
      x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
    );
  });
}
