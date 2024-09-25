import { AlphaValue } from 'lib/data-types';
import { FunctionalReactiveValue, ReactiveValue } from 'lib/reactive-values';

function easeOutBounceHelper(x: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

export function easeInOutBounce(
  progress: ReactiveValue<AlphaValue>,
): ReactiveValue<AlphaValue> {
  return new FunctionalReactiveValue([progress], ([progress]) => {
    const x = progress.getValue().getNumber();
    return new AlphaValue(
      x < 0.5
        ? (1 - easeOutBounceHelper(1 - 2 * x)) / 2
        : (1 + easeOutBounceHelper(2 * x - 1)) / 2,
    );
  });
}

export function easeInBounce(
  progress: ReactiveValue<AlphaValue>,
): ReactiveValue<AlphaValue> {
  return new FunctionalReactiveValue([progress], ([progress]) => {
    const x = progress.getValue().getNumber();
    return new AlphaValue(1 - easeOutBounceHelper(1 - x));
  });
}

export function easeOutBounce(
  progress: ReactiveValue<AlphaValue>,
): ReactiveValue<AlphaValue> {
  return new FunctionalReactiveValue([progress], ([progress]) => {
    const x = progress.getValue().getNumber();
    return new AlphaValue(easeOutBounceHelper(x));
  });
}
