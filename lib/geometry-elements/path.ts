import { PathData } from 'lib/data-types';
import {
  SimpleWrappedReactiveValue,
  ensureReactive,
} from 'lib/reactive-values';

import { Shape } from './shape';
import { SVG_NAMESPACE } from './svg-namespace';

export class Path extends Shape {
  protected _domElement = document.createElementNS(
    SVG_NAMESPACE,
    'path',
  ) as SVGPathElement;

  public pathData: SimpleWrappedReactiveValue<PathData | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));

  constructor() {
    super();
    this._domElement.setAttribute('pathLength', '1');
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
}
