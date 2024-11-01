import { Coordinate } from 'lib/data-types';
import {
  FunctionalReactiveValue,
  ReactiveValue,
  SimpleWrappedReactiveValue,
  ensureReactive,
} from 'lib/reactive-values';

import { Shape } from './shape';
import { svgNamespace } from './svg-namespace';

export class CubicBezier extends Shape {
  protected _domElement = document.createElementNS(
    svgNamespace,
    'path',
  ) as SVGPathElement;

  public startX: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public startY: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public control1X: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public control1Y: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public control2X: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public control2Y: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public endX: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public endY: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));

  private _d: ReactiveValue<string | undefined> = new FunctionalReactiveValue(
    [
      this.startX,
      this.startY,
      this.control1X,
      this.control1Y,
      this.control2X,
      this.control2Y,
      this.endX,
      this.endY,
    ],
    (_) => {
      const startXValue = this.startX.getValue()?.getNumber();
      const startYValue = this.startY.getValue()?.getNumber();
      const control1XValue = this.control1X.getValue()?.getNumber();
      const control1YValue = this.control1Y.getValue()?.getNumber();
      const control2XValue = this.control2X.getValue()?.getNumber();
      const control2YValue = this.control2Y.getValue()?.getNumber();
      const endXValue = this.endX.getValue()?.getNumber();
      const endYValue = this.endY.getValue()?.getNumber();

      if (
        startXValue === undefined ||
        startYValue === undefined ||
        control1XValue === undefined ||
        control1YValue === undefined ||
        control2XValue === undefined ||
        control2YValue === undefined ||
        endXValue === undefined ||
        endYValue === undefined
      ) {
        return undefined;
      }

      return `M ${startXValue} ${startYValue} C ${control1XValue} ${control1YValue} ${control2XValue} ${control2YValue} ${endXValue} ${endYValue}`;
    },
  );

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
    this.setupAttribute(this._d, 'd');
  }

  public getDomElement(): SVGElement {
    return this._domElement;
  }

  public getCenterX(): ReactiveValue<Coordinate | undefined> {
    return new FunctionalReactiveValue(
      [this.startX, this.control1X, this.control2X, this.endX],
      (_) => {
        const startXValue = this.startX.getValue()?.getNumber();
        const control1XValue = this.control1X.getValue()?.getNumber();
        const control2XValue = this.control2X.getValue()?.getNumber();
        const endXValue = this.endX.getValue()?.getNumber();

        if (
          startXValue === undefined ||
          control1XValue === undefined ||
          control2XValue === undefined ||
          endXValue === undefined
        ) {
          return undefined;
        }

        return new Coordinate(
          (startXValue + endXValue) / 8 +
            (3 * (control1XValue + control2XValue)) / 8,
        );
      },
    );
  }

  public getCenterY(): ReactiveValue<Coordinate | undefined> {
    return new FunctionalReactiveValue(
      [this.startY, this.control1X, this.control2X, this.endX],
      (_) => {
        const startYValue = this.startY.getValue()?.getNumber();
        const control1YValue = this.control1Y.getValue()?.getNumber();
        const control2YValue = this.control2Y.getValue()?.getNumber();
        const endYValue = this.endY.getValue()?.getNumber();

        if (
          startYValue === undefined ||
          control1YValue === undefined ||
          control2YValue === undefined ||
          endYValue === undefined
        ) {
          return undefined;
        }

        return new Coordinate(
          (startYValue + endYValue) / 8 +
            (3 * (control1YValue + control2YValue)) / 8,
        );
      },
    );
  }

  public getStartX(): ReactiveValue<Coordinate | undefined> {
    return this.startX;
  }

  public getStartY(): ReactiveValue<Coordinate | undefined> {
    return this.startY;
  }

  public getEndX(): ReactiveValue<Coordinate | undefined> {
    return this.endX;
  }

  public getEndY(): ReactiveValue<Coordinate | undefined> {
    return this.endY;
  }

  public getControlX1(): ReactiveValue<Coordinate | undefined> {
    return this.control1X;
  }

  public getControlY1(): ReactiveValue<Coordinate | undefined> {
    return this.control1Y;
  }

  public getControlX2(): ReactiveValue<Coordinate | undefined> {
    return this.control2X;
  }

  public getControlY2(): ReactiveValue<Coordinate | undefined> {
    return this.control2Y;
  }
}
