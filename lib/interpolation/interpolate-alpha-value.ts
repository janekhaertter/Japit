import { AlphaValue } from 'lib/data-types';
import { FunctionalReactiveValue, ReactiveValue } from 'lib/reactive-values';

export function interpolateAlphaValue(
  from: ReactiveValue<AlphaValue | undefined>,
  to: ReactiveValue<AlphaValue | undefined>,
  progress: ReactiveValue<AlphaValue>,
): ReactiveValue<AlphaValue | undefined> {
  return new FunctionalReactiveValue(
    [from, to, progress] as [
      ReactiveValue<AlphaValue | undefined>,
      ReactiveValue<AlphaValue | undefined>,
      ReactiveValue<AlphaValue>,
    ],
    ([from, to, progress]) => {
      const fromValue = from.getValue();
      const toValue = to.getValue();
      const progressValue = progress.getValue().getNumber();

      if (progressValue === 0) return fromValue;
      if (progressValue === 1) return toValue;
      if (fromValue === undefined || toValue === undefined) return toValue;

      const fromValueNumber = fromValue.getNumber();
      const toValueNumber = toValue.getNumber();

      return new AlphaValue(
        fromValueNumber + (toValueNumber - fromValueNumber) * progressValue,
      );
    },
  );
}
