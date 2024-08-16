import { AlphaValue, Length } from 'lib/data-types';
import { FunctionalReactiveValue, ReactiveValue } from 'lib/reactive-values';

export function interpolateLength(
  from: ReactiveValue<Length | undefined>,
  to: ReactiveValue<Length | undefined>,
  progress: ReactiveValue<AlphaValue>,
): ReactiveValue<Length | undefined> {
  return new FunctionalReactiveValue(
    [from, to, progress] as [
      ReactiveValue<Length | undefined>,
      ReactiveValue<Length | undefined>,
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

      return new Length(
        fromValueNumber + (toValueNumber - fromValueNumber) * progressValue,
      );
    },
  );
}
