import { GeometryElement } from 'lib/geometry-elements';

import { flattenIdentifiers } from './helper';
import { Identifier, isIdentifier } from './identifier';

export class GeometryElementManager {
  private _geometryElements: Map<Identifier, GeometryElement> = new Map();
  private _geometryElementIdentifiers: Map<GeometryElement, Identifier> =
    new Map();

  public requestGeometryElements(
    ...requestedElements: (
      | Identifier
      | GeometryElement
      | Iterable<Identifier | GeometryElement>
    )[]
  ): GeometryElement[] {
    const flattenedIdentifiers = flattenIdentifiers(requestedElements);
    const res: GeometryElement[] = [];

    for (const requestedElement of flattenedIdentifiers) {
      //////////////////////////////////////////////////
      // FIRST CASE: identifier instanceof Identifier //
      //////////////////////////////////////////////////
      if (isIdentifier(requestedElement)) {
        let element = this._geometryElements.get(requestedElement);

        if (element === undefined) {
          element = new GeometryElement();
          this._geometryElements.set(requestedElement, element);
          this._geometryElementIdentifiers.set(element, requestedElement);
        }

        res.push(element);
      }

      ////////////////////////////////////////////////////////
      // SECOND CASE: identifier instanceof GeometryElement //
      ////////////////////////////////////////////////////////
      else if (requestedElement instanceof GeometryElement) {
        const lookup = this._geometryElementIdentifiers.get(requestedElement);

        // make sure that we know the element for future requests
        if (lookup === undefined) {
          const newIdentifier = Symbol();
          this._geometryElements.set(newIdentifier, requestedElement);
          this._geometryElementIdentifiers.set(requestedElement, newIdentifier);
        }

        res.push(requestedElement);
      }

      //////////////////////////////////////////////////////////////////////////////
      // THIRD CASE: identifier instanceof Iterable<Identifier | GeometryElement> //
      //////////////////////////////////////////////////////////////////////////////
      else {
        // recursive call
        res.push(...this.requestGeometryElements(requestedElement));
      }
    }

    return res;
  }

  public getGeometryElements(): GeometryElement[] {
    return Array.from(this._geometryElements.values());
  }
}
