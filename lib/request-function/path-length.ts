import { Context } from '../request-object/context';
import { RequestObjectById } from '../request-object/request-object';

import { Identifier } from 'lib/animation';
import { ReactiveValue } from 'lib/reactive-values';

export function $pathLength(id: Identifier): RequestPathLength {
  return new RequestPathLength(id);
}

export class RequestPathLength extends RequestObjectById<number | undefined> {
  public getReactiveValue(context: Context): ReactiveValue<number | undefined> {
    return this.getGeometryElement(context).getPathLength();
  }
}
