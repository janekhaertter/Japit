import { Context } from '../request-object/context';
import { RequestObjectById } from '../request-object/request-object';

import { Identifier } from 'lib/animation';
import { Color } from 'lib/data-types';
import { ReactiveValue } from 'lib/reactive-values';

export function $fill(id: Identifier): RequestFill {
  return new RequestFill(id);
}

export class RequestFill extends RequestObjectById<Color | undefined> {
  public getReactiveValue(context: Context): ReactiveValue<Color | undefined> {
    return this.getGeometryElement(context).fill;
  }
}
