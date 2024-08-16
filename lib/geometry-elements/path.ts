import { Coordinate, PathData } from 'lib/data-types';
import {
  ReactiveValue,
  SimpleWrappedReactiveValue,
  ensureReactive,
} from 'lib/reactive-values';

import { Shape } from './shape';
import { svgNamespace } from './svg-namespace';

export class Path extends Shape {
  protected _domElement = document.createElementNS(
    svgNamespace,
    'path',
  ) as SVGPathElement;

  public pathData: SimpleWrappedReactiveValue<PathData | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));

  constructor() {
    super();
    this.pathData.subscribe((pathData) => {
      if (pathData === undefined) {
        this._domElement.removeAttribute('d');
      } else {
        this._domElement.setAttribute('d', pathData.toString());
      }
    });
  }

  public getDomElement(): SVGElement {
    return this._domElement;
  }

  public getCenterX(): ReactiveValue<Coordinate | undefined> {
    throw 'Not implemented';
  }

  public getCenterY(): ReactiveValue<Coordinate | undefined> {
    throw 'Not implemented';
  }
}
