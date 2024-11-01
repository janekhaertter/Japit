import { AlphaValue } from 'lib/data-types';
import { FunctionalReactiveValue, ReactiveValue } from 'lib/reactive-values';

export function easeJumpToEnd(
  progress: ReactiveValue<AlphaValue>,
): ReactiveValue<AlphaValue> {
  return new FunctionalReactiveValue([progress], ([progress]) => {
    const x = progress.getValue().getNumber();
    return new AlphaValue(x === 0 ? 0 : 1);
  });
}
