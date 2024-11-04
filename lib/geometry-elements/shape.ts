import { Coordinate, Length } from 'lib/data-types';
import { ReactiveValue, ensureReactive } from 'lib/reactive-values';

import { Rectangle } from './rectangle';

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

  public getRadiusX(): ReactiveValue<Length | undefined> {
    return ensureReactive(undefined);
  }

  public getRadiusY(): ReactiveValue<Length | undefined> {
    return ensureReactive(undefined);
  }

  public getTopLeftX(): ReactiveValue<Coordinate | undefined> {
    return ensureReactive(undefined);
  }

  public getTopLeftY(): ReactiveValue<Coordinate | undefined> {
    return ensureReactive(undefined);
  }

  public getWidth(): ReactiveValue<Length | undefined> {
    return ensureReactive(undefined);
  }

  public getHeight(): ReactiveValue<Length | undefined> {
    return ensureReactive(undefined);
  }

  public getStartX(): ReactiveValue<Coordinate | undefined> {
    return ensureReactive(undefined);
  }

  public getStartY(): ReactiveValue<Coordinate | undefined> {
    return ensureReactive(undefined);
  }

  public getEndX(): ReactiveValue<Coordinate | undefined> {
    return ensureReactive(undefined);
  }

  public getEndY(): ReactiveValue<Coordinate | undefined> {
    return ensureReactive(undefined);
  }

  public getControlX1(): ReactiveValue<Coordinate | undefined> {
    return ensureReactive(undefined);
  }

  public getControlY1(): ReactiveValue<Coordinate | undefined> {
    return ensureReactive(undefined);
  }

  public getControlX2(): ReactiveValue<Coordinate | undefined> {
    return ensureReactive(undefined);
  }

  public getControlY2(): ReactiveValue<Coordinate | undefined> {
    return ensureReactive(undefined);
  }

  public getChild(): ReactiveValue<SVGElement | undefined> {
    return ensureReactive(undefined);
  }

  public toRectangle(): Rectangle | undefined {
    return undefined;
  }
}
