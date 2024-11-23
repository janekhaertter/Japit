import { Identifier } from 'lib/animation';
import { Length } from 'lib/data-types';
import { GeometryElement } from 'lib/geometry-elements';

import { Context } from './context';
import { WrappedNumberRequestObject } from './wrapped-number-request-object';

export abstract class LengthRequestObject extends WrappedNumberRequestObject<Length> {
  protected _factory = (value: number) => new Length(value);
}

export abstract class LengthRequestObjectById extends LengthRequestObject {
  protected _id: Identifier | GeometryElement;

  constructor(id: Identifier | GeometryElement) {
    super();
    this._id = id;
  }

  protected getGeometryElement(context: Context): GeometryElement {
    return context.geometryElementManager.requestGeometryElements(this._id)[0];
  }
}
