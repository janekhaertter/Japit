import { Coordinate } from 'lib/data-types';
import {
  FunctionalReactiveValue,
  ReactiveValue,
  SimpleWrappedReactiveValue,
  ensureReactive,
} from 'lib/reactive-values';

import { Shape } from './shape';
import { svgNamespace } from './svg-namespace';

export class Line extends Shape {
  protected _domElement = document.createElementNS(
    svgNamespace,
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
}
