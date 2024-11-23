import { Identifier } from 'lib/animation';
import { Coordinate } from 'lib/data-types';
import { GeometryElement } from 'lib/geometry-elements';

import { Context } from './context';
import { WrappedNumberRequestObject } from './wrapped-number-request-object';

export abstract class CoordinateRequestObject extends WrappedNumberRequestObject<Coordinate> {
  protected _factory = (value: number) => new Coordinate(value);
}

export abstract class CoordinateRequestObjectById extends CoordinateRequestObject {
  protected _id: Identifier | GeometryElement;

  constructor(id: Identifier | GeometryElement) {
    super();
    this._id = id;
  }

  protected getGeometryElement(context: Context): GeometryElement {
    return context.geometryElementManager.requestGeometryElements(this._id)[0];
  }
}
