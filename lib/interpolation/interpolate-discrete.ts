import { AlphaValue } from 'lib/data-types';
import { FunctionalReactiveValue, ReactiveValue } from 'lib/reactive-values';

export function interpolateDiscrete<T>(
  from: ReactiveValue<T>,
  to: ReactiveValue<T>,
  progress: ReactiveValue<AlphaValue>,
): ReactiveValue<T> {
  return new FunctionalReactiveValue(
    [from, to, progress] as [
      ReactiveValue<T>,
      ReactiveValue<T>,
      ReactiveValue<AlphaValue>,
    ],
    ([from, to, progress]) => {
      const fromValue = from.getValue();
      const toValue = to.getValue();
      const progressValue = progress.getValue().getNumber();

      if (progressValue <= 0.5) {
        return fromValue;
      } else {
        return toValue;
      }
    },
  );
}
