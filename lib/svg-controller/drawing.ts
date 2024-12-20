import { GeometryElement } from 'lib/geometry-elements';
import { SVG_NAMESPACE } from 'lib/geometry-elements';

export class Drawing {
  public svg: SVGSVGElement;
  protected _geometryElements = new Set<GeometryElement>();

  constructor(svg?: SVGSVGElement) {
    this.svg = svg ?? document.createElementNS(SVG_NAMESPACE, 'svg');
  }

  public addGeometryElements(
    geometryElement: GeometryElement | Iterable<GeometryElement>,
  ): void {
    if (geometryElement instanceof GeometryElement) {
      return this.addGeometryElements([geometryElement]);
    }
    for (const element of geometryElement) {
      this._geometryElements.add(element);
    }
  }

  public deleteGeometryElements(
    geometryElement: GeometryElement | Iterable<GeometryElement>,
  ): void {
    if (geometryElement instanceof GeometryElement) {
      return this.deleteGeometryElements([geometryElement]);
    }
    for (const element of geometryElement) {
      this._geometryElements.delete(element);
    }
  }

  public draw(): void {
    // remove children
    this.svg.replaceChildren();

    // sort and filter them
    const toDraw = [...this._geometryElements]
      .filter((element) => !element.deleted.getValue())
      .sort((a, b) => a.zIndex.getValue() - b.zIndex.getValue());

    // update their properties
    toDraw.forEach((element) => {
      element.draw();
    });

    // reinsert
    this.svg.replaceChildren(...toDraw.map((element) => element.domElement));
  }
}
