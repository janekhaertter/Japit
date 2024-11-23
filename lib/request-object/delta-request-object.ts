import { Identifier } from 'lib/animation';
import { Delta } from 'lib/data-types';
import { GeometryElement } from 'lib/geometry-elements';

import { Context } from './context';
import { WrappedNumberRequestObject } from './wrapped-number-request-object';

export abstract class DeltaRequestObject extends WrappedNumberRequestObject<Delta> {
  protected _factory = (value: number) => new Delta(value);
}

export abstract class DeltaRequestObjectById extends DeltaRequestObject {
  protected _id: Identifier | GeometryElement;

  constructor(id: Identifier | GeometryElement) {
    super();
    this._id = id;
  }

  protected getGeometryElement(context: Context): GeometryElement {
    return context.geometryElementManager.requestGeometryElements(this._id)[0];
  }
}
