import { Coordinate } from 'lib/data-types';
import { ReactiveValue } from 'lib/reactive-values';

export abstract class Shape {
  public abstract getDomElement(): SVGElement;
  public abstract getCenterX(): ReactiveValue<Coordinate | undefined>;
  public abstract getCenterY(): ReactiveValue<Coordinate | undefined>;
}
