import { AlphaValue } from 'lib/data-types';
import { FunctionalReactiveValue, ReactiveValue } from 'lib/reactive-values';

export function easeInOutCubic(
  progress: ReactiveValue<AlphaValue>,
): ReactiveValue<AlphaValue> {
  return new FunctionalReactiveValue([progress], ([progress]) => {
    const x = progress.getValue().getNumber();
    return new AlphaValue(
      x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
    );
  });
}

export function easeInCubic(
  progress: ReactiveValue<AlphaValue>,
): ReactiveValue<AlphaValue> {
  return new FunctionalReactiveValue([progress], ([progress]) => {
    const x = progress.getValue().getNumber();
    return new AlphaValue(Math.pow(x, 3));
  });
}

export function easeOutCubic(
  progress: ReactiveValue<AlphaValue>,
): ReactiveValue<AlphaValue> {
  return new FunctionalReactiveValue([progress], ([progress]) => {
    const x = progress.getValue().getNumber();
    return new AlphaValue(1 - Math.pow(1 - x, 3));
  });
}
