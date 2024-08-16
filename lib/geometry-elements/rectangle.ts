import { Coordinate, Length } from 'lib/data-types';
import {
  FunctionalReactiveValue,
  ReactiveValue,
  SimpleWrappedReactiveValue,
  ensureReactive,
} from 'lib/reactive-values';

import { Shape } from './shape';
import { svgNamespace } from './svg-namespace';

export class Rectangle extends Shape {
  protected _domElement = document.createElementNS(
    svgNamespace,
    'rect',
  ) as SVGRectElement;

  public x: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public y: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public width: SimpleWrappedReactiveValue<Length | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public height: SimpleWrappedReactiveValue<Length | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public rx: SimpleWrappedReactiveValue<Length | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public ry: SimpleWrappedReactiveValue<Length | undefined> =
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
    this.setupAttribute(this.x, 'x');
    this.setupAttribute(this.y, 'y');
    this.setupAttribute(this.width, 'width');
    this.setupAttribute(this.height, 'height');
    this.setupAttribute(this.rx, 'rx');
    this.setupAttribute(this.ry, 'ry');
  }

  public getDomElement(): SVGElement {
    return this._domElement;
  }

  public getCenterX(): ReactiveValue<Coordinate | undefined> {
    return new FunctionalReactiveValue([this.x, this.width], ([x, width]) => {
      const xValue = x.getValue()?.getNumber();
      const widthValue = width.getValue()?.getNumber();

      if (xValue === undefined || widthValue === undefined) {
        return undefined;
      }

      return new Coordinate(xValue + widthValue / 2);
    });
  }

  public getCenterY(): ReactiveValue<Coordinate | undefined> {
    return new FunctionalReactiveValue([this.y, this.height], ([y, height]) => {
      const yValue = y.getValue()?.getNumber();
      const heightValue = height.getValue()?.getNumber();

      if (yValue === undefined || heightValue === undefined) {
        return undefined;
      }

      return new Coordinate(yValue + heightValue / 2);
    });
  }
}
