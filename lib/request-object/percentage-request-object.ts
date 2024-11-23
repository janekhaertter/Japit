import { Identifier } from 'lib/animation';
import { Percentage } from 'lib/data-types';
import { GeometryElement } from 'lib/geometry-elements';

import { Context } from './context';
import { WrappedNumberRequestObject } from './wrapped-number-request-object';

export abstract class PercentageRequestObject extends WrappedNumberRequestObject<Percentage> {
  protected _factory = (value: number) => new Percentage(value);
}

export abstract class PercentageRequestObjectById extends PercentageRequestObject {
  protected _id: Identifier | GeometryElement;

  constructor(id: Identifier | GeometryElement) {
    super();
    this._id = id;
  }

  protected getGeometryElement(context: Context): GeometryElement {
    return context.geometryElementManager.requestGeometryElements(this._id)[0];
  }
}
