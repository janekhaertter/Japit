import { Identifier } from 'lib/animation';
import { Length } from 'lib/data-types';
import { ReactiveValue } from 'lib/reactive-values';

import { Context } from './context';
import { RequestObjectById } from './request-object';

export function $radius(id: Identifier): RequestRadius {
  return new RequestRadius(id);
}

export class RequestRadius extends RequestObjectById<Length | undefined> {
  public getReactiveValue(context: Context): ReactiveValue<Length | undefined> {
    return this.getGeometryElement(context).getRadius();
  }
}
