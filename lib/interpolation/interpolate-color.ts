import { AlphaValue, Color } from 'lib/data-types';
import { FunctionalReactiveValue, ReactiveValue } from 'lib/reactive-values';

export function interpolateColorRGB(
  from: ReactiveValue<Color | undefined>,
  to: ReactiveValue<Color | undefined>,
  progress: ReactiveValue<AlphaValue>,
): ReactiveValue<Color | undefined> {
  return new FunctionalReactiveValue(
    [from, to, progress] as [
      ReactiveValue<Color>,
      ReactiveValue<Color>,
      ReactiveValue<AlphaValue>,
    ],
    ([from, to, progress]) => {
      const fromValue = from.getValue();
      const toValue = to.getValue();
      const progressValue = progress.getValue().getNumber();

      if (progressValue === 0) return fromValue;
      if (progressValue === 1) return toValue;
      if (fromValue === undefined || toValue === undefined) return toValue;

      return fromValue.range(toValue, { space: 'srgb' })(progressValue);
    },
  );
}
