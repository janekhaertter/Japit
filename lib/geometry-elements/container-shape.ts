import { Coordinate, Length } from 'lib/data-types';
import {
  ReactiveValue,
  SimpleWrappedReactiveValue,
  ensureReactive,
} from 'lib/reactive-values';

import { Shape } from './shape';
import { svgNamespace } from './svg-namespace';

export class ContainerShape extends Shape {
  private _domElement: SVGSVGElement = document.createElementNS(
    svgNamespace,
    'svg',
  ) as SVGSVGElement;

  public child: SimpleWrappedReactiveValue<SVGElement | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));

  public width: SimpleWrappedReactiveValue<Length | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public height: SimpleWrappedReactiveValue<Length | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public x: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  public y: SimpleWrappedReactiveValue<Coordinate | undefined> =
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
    this.child.subscribe((child) => {
      if (child === undefined) {
        this._domElement.replaceChildren();
      } else {
        this._domElement.replaceChildren(child);
      }
    });
  }

  public toStringRecursive(): string {
    return `ContainerShape(${this.child.getValue()?.constructor.name})`;
  }

  public getDomElement(): SVGElement {
    return this._domElement;
  }

  public getTopLeftX(): ReactiveValue<Coordinate | undefined> {
    return this.x;
  }

  public getTopLeftY(): ReactiveValue<Coordinate | undefined> {
    return this.y;
  }

  public getWidth(): ReactiveValue<Length | undefined> {
    return this.width;
  }

  public getHeight(): ReactiveValue<Length | undefined> {
    return this.height;
  }

  public getChild(): ReactiveValue<SVGElement | undefined> {
    return this.child;
  }
}
