import { Coordinate, Length } from 'lib/data-types';
import {
  FunctionalReactiveValue,
  ReactiveValue,
  SimpleWrappedReactiveValue,
  ensureReactive,
} from 'lib/reactive-values';

import { Ellipse } from './elipse';
import { Rectangle } from './rectangle';
import { Shape } from './shape';
import { svgNamespace } from './svg-namespace';

export class Circle extends Shape {
  protected _domElement = document.createElementNS(
    svgNamespace,
    'circle',
  ) as SVGCircleElement;

  public cx: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public cy: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public r: SimpleWrappedReactiveValue<Length | undefined> =
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
    this.setupAttribute(this.r, 'r');
  }

  public getDomElement(): SVGElement {
    return this._domElement;
  }

  public toCircle(): Circle {
    return this;
  }

  public toEllipse(): Ellipse {
    const ellipse = new Ellipse();

    ellipse.cx.wrap(this.cx);
    ellipse.cy.wrap(this.cy);
    ellipse.rx.wrap(this.r);
    ellipse.ry.wrap(this.r);

    return ellipse;
  }

  public toRectangle(): Rectangle {
    return this.toEllipse().toRectangle();
  }

  public getCenterX(): ReactiveValue<Coordinate | undefined> {
    return this.cx;
  }

  public getCenterY(): ReactiveValue<Coordinate | undefined> {
    return this.cy;
  }

  public getRadius(): ReactiveValue<Length | undefined> {
    return this.r;
  }

  public getRadiusX(): ReactiveValue<Length | undefined> {
    return this.r;
  }

  public getRadiusY(): ReactiveValue<Length | undefined> {
    return this.r;
  }

  public getTopLeftX(): ReactiveValue<Coordinate | undefined> {
    return new SimpleWrappedReactiveValue(
      new FunctionalReactiveValue([this.cx, this.r], () => {
        const cxValue = this.cx.getValue();
        const rValue = this.r.getValue() ?? new Length(0);

        if (cxValue === undefined) {
          return undefined;
        }

        return new Coordinate(cxValue.getNumber() - rValue.getNumber());
      }),
    );
  }

  public getTopLeftY(): ReactiveValue<Coordinate | undefined> {
    return new SimpleWrappedReactiveValue(
      new FunctionalReactiveValue([this.cy, this.r], () => {
        const cyValue = this.cy.getValue();
        const rValue = this.r.getValue() ?? new Length(0);

        if (cyValue === undefined) {
          return undefined;
        }

        return new Coordinate(cyValue.getNumber() - rValue.getNumber());
      }),
    );
  }

  public getWidth(): ReactiveValue<Length | undefined> {
    return new SimpleWrappedReactiveValue(
      new FunctionalReactiveValue([this.r], () => {
        const rValue = this.r.getValue();

        if (rValue === undefined) {
          return undefined;
        }

        return new Length(2 * rValue.getNumber());
      }),
    );
  }

  public getHeight(): ReactiveValue<Length | undefined> {
    return this.getWidth();
  }
}
