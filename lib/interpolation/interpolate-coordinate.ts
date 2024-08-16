import { AlphaValue, Coordinate } from 'lib/data-types';
import { FunctionalReactiveValue, ReactiveValue } from 'lib/reactive-values';

export function interpolateCoordinate(
  from: ReactiveValue<Coordinate | undefined>,
  to: ReactiveValue<Coordinate | undefined>,
  progress: ReactiveValue<AlphaValue>,
): ReactiveValue<Coordinate | undefined> {
  return new FunctionalReactiveValue(
    [from, to, progress] as [
      ReactiveValue<Coordinate | undefined>,
      ReactiveValue<Coordinate | undefined>,
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

      return new Coordinate(
        fromValueNumber + (toValueNumber - fromValueNumber) * progressValue,
      );
    },
  );
}
