import { Context } from '../request-object/context';

import { Identifier } from 'lib/animation';
import { Length } from 'lib/data-types';
import { ReactiveValue } from 'lib/reactive-values';
import { LengthRequestObjectById } from 'lib/request-object';

export function $radius(id: Identifier): RequestRadius {
  return new RequestRadius(id);
}

export class RequestRadius extends LengthRequestObjectById {
  public getReactiveValue(context: Context): ReactiveValue<Length | undefined> {
    return this.getGeometryElement(context).getRadius();
  }
}
