import { Shape } from './shape';
import { svgNamespace } from './svg-namespace';

export class EmptyShape extends Shape {
  private _domElement: SVGGElement = document.createElementNS(
    svgNamespace,
    'g',
  ) as SVGGElement;

  constructor() {
    super();
  }

  public toStringRecursive(): string {
    return `EmptyShape`;
  }

  public getDomElement(): SVGElement {
    return this._domElement;
  }
}
