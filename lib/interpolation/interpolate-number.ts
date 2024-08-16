import { AlphaValue } from 'lib/data-types';
import { FunctionalReactiveValue, ReactiveValue } from 'lib/reactive-values';

export function interpolateNumber(
  from: ReactiveValue<number>,
  to: ReactiveValue<number>,
  progress: ReactiveValue<AlphaValue>,
): ReactiveValue<number> {
  return new FunctionalReactiveValue(
    [from, to, progress] as [
      ReactiveValue<number>,
      ReactiveValue<number>,
      ReactiveValue<AlphaValue>,
    ],
    ([from, to, progress]) => {
      const fromValue = from.getValue();
      const toValue = to.getValue();
      const progressValue = progress.getValue().getNumber();
      return fromValue + (toValue - fromValue) * progressValue;
    },
  );
}
