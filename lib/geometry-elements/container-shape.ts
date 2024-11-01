import { Shape } from './shape';
import { svgNamespace } from './svg-namespace';

export class ContainerShape extends Shape {
  private _domElement: SVGSVGElement = document.createElementNS(
    svgNamespace,
    'svg',
  ) as SVGSVGElement;

  private _element: SVGElement;

  constructor(element: SVGElement) {
    super();
    this._element = element;
    this._domElement.appendChild(this._element);
  }

  public toStringRecursive(): string {
    return `ContainerShape(${this._element.constructor.name})`;
  }

  public getDomElement(): SVGElement {
    return this._domElement;
  }
}
