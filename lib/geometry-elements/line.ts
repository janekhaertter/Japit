import { Coordinate, Length } from 'lib/data-types';
import {
  FunctionalReactiveValue,
  ReactiveValue,
  SimpleWrappedReactiveValue,
  ensureReactive,
} from 'lib/reactive-values';

import { Rectangle } from './rectangle';
import { Shape } from './shape';
import { SVG_NAMESPACE } from './svg-namespace';

export class Line extends Shape {
  protected _domElement = document.createElementNS(
    SVG_NAMESPACE,
    'line',
  ) as SVGLineElement;

  public x1: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public x2: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public y1: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public y2: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public pathLength: SimpleWrappedReactiveValue<number | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));

  protected setupAttribute(
    reactiveValue: ReactiveValue<any>,
    attributeName: string,
  ) {
    reactiveValue.subscribe((value) => {
      if (value === undefined) {
        this._domElement.removeAttribute(attributeName);
      } else {
        this._domElement.setAttribute(attributeName, value);
      }
    });
  }

  constructor() {
    super();
    this.setupAttribute(this.x1, 'x1');
    this.setupAttribute(this.x2, 'x2');
    this.setupAttribute(this.y1, 'y1');
    this.setupAttribute(this.y2, 'y2');
    this.setupAttribute(this.pathLength, 'pathLength');
  }

  public getDomElement(): SVGElement {
    return this._domElement;
  }

  public getCenterX(): ReactiveValue<Coordinate | undefined> {
    return new FunctionalReactiveValue([this.x1, this.x2], ([x1, x2]) => {
      const x1Value = x1.getValue()?.getNumber();
      const x2Value = x2.getValue()?.getNumber();

      if (x1Value === undefined || x2Value === undefined) {
        return undefined;
      }

      return new Coordinate((x1Value + x2Value) / 2);
    });
  }

  public getCenterY(): ReactiveValue<Coordinate | undefined> {
    return new FunctionalReactiveValue([this.y1, this.y2], ([y1, y2]) => {
      const y1Value = y1.getValue()?.getNumber();
      const y2Value = y2.getValue()?.getNumber();

      if (y1Value === undefined || y2Value === undefined) {
        return undefined;
      }

      return new Coordinate((y1Value + y2Value) / 2);
    });
  }

  public getStartX(): ReactiveValue<Coordinate | undefined> {
    return this.x1;
  }

  public getStartY(): ReactiveValue<Coordinate | undefined> {
    return this.y1;
  }

  public getEndX(): ReactiveValue<Coordinate | undefined> {
    return this.x2;
  }

  public getEndY(): ReactiveValue<Coordinate | undefined> {
    return this.y2;
  }

  public getTopLeftX(): ReactiveValue<Coordinate | undefined> {
    return new FunctionalReactiveValue([this.x1, this.x2], ([x1, x2]) => {
      const x1Value = x1.getValue()?.getNumber();
      const x2Value = x2.getValue()?.getNumber();

      if (x1Value === undefined || x2Value === undefined) {
        return undefined;
      }

      return new Coordinate(Math.min(x1Value, x2Value));
    });
  }

  public getTopLeftY(): ReactiveValue<Coordinate | undefined> {
    return new FunctionalReactiveValue([this.y1, this.y2], ([y1, y2]) => {
      const y1Value = y1.getValue()?.getNumber();
      const y2Value = y2.getValue()?.getNumber();

      if (y1Value === undefined || y2Value === undefined) {
        return undefined;
      }

      return new Coordinate(Math.min(y1Value, y2Value));
    });
  }

  public getWidth(): ReactiveValue<Length | undefined> {
    return new FunctionalReactiveValue([this.x1, this.x2], ([x1, x2]) => {
      const x1Value = x1.getValue()?.getNumber();
      const x2Value = x2.getValue()?.getNumber();

      if (x1Value === undefined || x2Value === undefined) {
        return undefined;
      }

      return new Length(Math.abs(x2Value - x1Value));
    });
  }

  public getHeight(): ReactiveValue<Length | undefined> {
    return new FunctionalReactiveValue([this.y1, this.y2], ([y1, y2]) => {
      const y1Value = y1.getValue()?.getNumber();
      const y2Value = y2.getValue()?.getNumber();

      if (y1Value === undefined || y2Value === undefined) {
        return undefined;
      }

      return new Length(Math.abs(y2Value - y1Value));
    });
  }

  public getControlX1(): ReactiveValue<Coordinate | undefined> {
    return new FunctionalReactiveValue([this.x1, this.x2], ([x1, x2]) => {
      const x1Value = x1.getValue()?.getNumber();
      const x2Value = x2.getValue()?.getNumber();

      if (x1Value === undefined || x2Value === undefined) {
        return undefined;
      }

      return new Coordinate(x1Value + (x2Value - x1Value) / 3);
    });
  }

  public getControlY1(): ReactiveValue<Coordinate | undefined> {
    return new FunctionalReactiveValue([this.y1, this.y2], ([y1, y2]) => {
      const y1Value = y1.getValue()?.getNumber();
      const y2Value = y2.getValue()?.getNumber();

      if (y1Value === undefined || y2Value === undefined) {
        return undefined;
      }

      return new Coordinate(y1Value + (y2Value - y1Value) / 3);
    });
  }

  public getControlX2(): ReactiveValue<Coordinate | undefined> {
    return new FunctionalReactiveValue([this.x1, this.x2], ([x1, x2]) => {
      const x1Value = x1.getValue()?.getNumber();
      const x2Value = x2.getValue()?.getNumber();

      if (x1Value === undefined || x2Value === undefined) {
        return undefined;
      }

      return new Coordinate(x1Value + (x2Value - x1Value) * (2 / 3));
    });
  }

  public getControlY2(): ReactiveValue<Coordinate | undefined> {
    return new FunctionalReactiveValue([this.y1, this.y2], ([y1, y2]) => {
      const y1Value = y1.getValue()?.getNumber();
      const y2Value = y2.getValue()?.getNumber();

      if (y1Value === undefined || y2Value === undefined) {
        return undefined;
      }

      return new Coordinate(y1Value + (y2Value - y1Value) * (2 / 3));
    });
  }

  public getPathLength(): ReactiveValue<number | undefined> {
    return this.pathLength;
  }

  public toRectangle(): Rectangle | undefined {
    const rect = new Rectangle();

    rect.x.wrap(this.getTopLeftX());
    rect.y.wrap(this.getTopLeftY());
    rect.width.wrap(this.getWidth());
    rect.height.wrap(this.getHeight());
    rect.rx.wrap(this.getRadiusX());
    rect.ry.wrap(this.getRadiusY());

    return rect;
  }
}
