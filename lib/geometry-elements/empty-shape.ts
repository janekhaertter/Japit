import { Shape } from './shape';
import { SVG_NAMESPACE } from './svg-namespace';

export class EmptyShape extends Shape {
  private _domElement: SVGGElement = document.createElementNS(
    SVG_NAMESPACE,
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
