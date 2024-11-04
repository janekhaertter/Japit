import { Identifier } from 'lib/animation';
import { GeometryElement } from 'lib/geometry-elements';
import { ReactiveValue } from 'lib/reactive-values';

import { Context } from './context';

export abstract class RequestObject<T> {
  public abstract getReactiveValue(context: Context): ReactiveValue<T>;
}

export abstract class RequestObjectById<T> extends RequestObject<T> {
  protected _id: Identifier | GeometryElement;

  constructor(id: Identifier | GeometryElement) {
    super();
    this._id = id;
  }

  protected getGeometryElement(context: Context): GeometryElement {
    return context.geometryElementManager.requestGeometryElements(this._id)[0];
  }
}
