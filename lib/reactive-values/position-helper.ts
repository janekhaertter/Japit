import { Coordinate, Position } from 'lib/data-types';

import { FunctionalReactiveValue } from './functional-reactive-value';
import { ReactiveValue } from './reactive-value';

export function coordinatesToPosition(
  x: ReactiveValue<Coordinate | undefined>,
  y: ReactiveValue<Coordinate | undefined>,
): ReactiveValue<Position | undefined> {
  return new FunctionalReactiveValue([x, y], ([x, y]) => {
    const xValue = x.getValue();
    const yValue = y.getValue();

    if (xValue === undefined || yValue === undefined) {
      return undefined;
    }

    return new Position(xValue, yValue);
  });
}

export function positionToCoordinates(
  position: ReactiveValue<Position | undefined>,
): {
  x: ReactiveValue<Coordinate | undefined>;
  y: ReactiveValue<Coordinate | undefined>;
} {
  const x = new FunctionalReactiveValue([position], ([position]) =>
    position.getValue()?.getX(),
  );
  const y = new FunctionalReactiveValue([position], ([position]) =>
    position.getValue()?.getY(),
  );
  return { x, y };
}
