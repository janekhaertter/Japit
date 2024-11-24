import { Context } from '../request-object/context';

import { Identifier } from 'lib/animation';
import { Coordinate } from 'lib/data-types';
import { ReactiveValue } from 'lib/reactive-values';
import { CoordinateRequestObjectById } from 'lib/request-object';

export function $topLeftX(id: Identifier): RequestTopLeftX {
  return new RequestTopLeftX(id);
}

export class RequestTopLeftX extends CoordinateRequestObjectById {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<Coordinate | undefined> {
    return this.getGeometryElement(context).getTopLeftX();
  }
}

export function $topLeftY(id: Identifier): RequestTopLeftY {
  return new RequestTopLeftY(id);
}

export class RequestTopLeftY extends CoordinateRequestObjectById {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<Coordinate | undefined> {
    return this.getGeometryElement(context).getTopLeftY();
  }
}
