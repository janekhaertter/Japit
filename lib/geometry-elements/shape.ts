import { Coordinate, Length } from 'lib/data-types';
import { ReactiveValue, ensureReactive } from 'lib/reactive-values';

export abstract class Shape {
  public abstract getDomElement(): SVGElement;
  public getCenterX(): ReactiveValue<Coordinate | undefined> {
    return ensureReactive(undefined);
  }
  public getCenterY(): ReactiveValue<Coordinate | undefined> {
    return ensureReactive(undefined);
  }
  public getRadius(): ReactiveValue<Length | undefined> {
    return ensureReactive(undefined);
  }
}
