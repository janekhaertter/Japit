import { Coordinate, Length } from 'lib/data-types';
import { Ellipsable } from 'lib/interpolation';
import {
  FunctionalReactiveValue,
  ReactiveValue,
  SimpleWrappedReactiveValue,
  ensureReactive,
} from 'lib/reactive-values';

import { Rectangle } from './rectangle';
import { Shape } from './shape';
import { svgNamespace } from './svg-namespace';

export class Ellipse extends Shape implements Ellipsable {
  protected _domElement = document.createElementNS(
    svgNamespace,
    'circle',
  ) as SVGCircleElement;

  public cx: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public cy: SimpleWrappedReactiveValue<Coordinate | undefined> =
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
    this.setupAttribute(this.cx, 'cx');
    this.setupAttribute(this.cy, 'cy');
    this.setupAttribute(this.rx, 'rx');
    this.setupAttribute(this.ry, 'ry');
  }

  public getDomElement(): SVGElement {
    return this._domElement;
  }

  public toEllipse(): Ellipse {
    return this;
  }

  public toRectangle(): Rectangle {
    const rectangle = new Rectangle();

    rectangle.x.wrap(
      new FunctionalReactiveValue(
        [this.cx, this.rx] as [
          ReactiveValue<Coordinate | undefined>,
          ReactiveValue<Length | undefined>,
        ],
        ([cx, rx]) => {
          const cxValue = cx.getValue();
          const rxValue = rx.getValue();

          if (cxValue === undefined || rxValue === undefined) {
            return undefined;
          }

          return new Coordinate(cxValue.getNumber() - rxValue.getNumber());
        },
      ),
    );

    rectangle.y.wrap(
      new FunctionalReactiveValue(
        [this.cy, this.ry] as [
          ReactiveValue<Coordinate | undefined>,
          ReactiveValue<Length | undefined>,
        ],
        ([cy, ry]) => {
          const cyValue = cy.getValue();
          const ryValue = ry.getValue();

          if (cyValue === undefined || ryValue === undefined) {
            return undefined;
          }

          return new Coordinate(cyValue.getNumber() - ryValue.getNumber());
        },
      ),
    );

    rectangle.width.wrap(
      new FunctionalReactiveValue(
        [this.rx] as [ReactiveValue<Length | undefined>],
        ([rx]) => {
          const rxValue = rx.getValue();

          if (rxValue === undefined) {
            return undefined;
          }

          return new Length(2 * rxValue.getNumber());
        },
      ),
    );

    rectangle.height.wrap(
      new FunctionalReactiveValue(
        [this.ry] as [ReactiveValue<Length | undefined>],
        ([ry]) => {
          const ryValue = ry.getValue();

          if (ryValue === undefined) {
            return undefined;
          }

          return new Length(2 * ryValue.getNumber());
        },
      ),
    );

    rectangle.rx.wrap(this.rx);
    rectangle.ry.wrap(this.ry);

    return rectangle;
  }
}
