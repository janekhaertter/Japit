import { Context } from '../request-object/context';

import { Identifier } from 'lib/animation';
import { Length } from 'lib/data-types';
import { ReactiveValue } from 'lib/reactive-values';
import { LengthRequestObjectById } from 'lib/request-object';

export function $width(id: Identifier): RequestWidth {
  return new RequestWidth(id);
}

export class RequestWidth extends LengthRequestObjectById {
  public getReactiveValue(context: Context): ReactiveValue<Length | undefined> {
    return this.getGeometryElement(context).getWidth();
  }
}

export function $height(id: Identifier): RequestHeight {
  return new RequestHeight(id);
}

export class RequestHeight extends LengthRequestObjectById {
  public getReactiveValue(context: Context): ReactiveValue<Length | undefined> {
    return this.getGeometryElement(context).getHeight();
  }
}
