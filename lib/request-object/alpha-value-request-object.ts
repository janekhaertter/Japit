import { Identifier } from 'lib/animation';
import { AlphaValue } from 'lib/data-types';
import { GeometryElement } from 'lib/geometry-elements';

import { Context } from './context';
import { WrappedNumberRequestObject } from './wrapped-number-request-object';

export abstract class AlphaValueRequestObject extends WrappedNumberRequestObject<AlphaValue> {
  protected _factory = (value: number) => new AlphaValue(value);
}

export abstract class AlphaValueRequestObjectById extends AlphaValueRequestObject {
  protected _id: Identifier | GeometryElement;

  constructor(id: Identifier | GeometryElement) {
    super();
    this._id = id;
  }

  protected getGeometryElement(context: Context): GeometryElement {
    return context.geometryElementManager.requestGeometryElements(this._id)[0];
  }
}
