import { AlphaValue, Delta } from 'lib/data-types';
import { FunctionalReactiveValue, ReactiveValue } from 'lib/reactive-values';

export function interpolateDelta(
  from: ReactiveValue<Delta | undefined>,
  to: ReactiveValue<Delta | undefined>,
  progress: ReactiveValue<AlphaValue>,
): ReactiveValue<Delta | undefined> {
  return new FunctionalReactiveValue(
    [from, to, progress] as [
      ReactiveValue<Delta | undefined>,
      ReactiveValue<Delta | undefined>,
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

      return new Delta(
        fromValueNumber + (toValueNumber - fromValueNumber) * progressValue,
      );
    },
  );
}
