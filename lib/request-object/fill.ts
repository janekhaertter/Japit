import { Identifier } from 'lib/animation';
import { Color } from 'lib/data-types';
import { ReactiveValue } from 'lib/reactive-values';

import { Context } from './context';
import { RequestObjectById } from './request-object';

export function $fill(id: Identifier): RequestFill {
  return new RequestFill(id);
}

export class RequestFill extends RequestObjectById<Color | undefined> {
  public getReactiveValue(context: Context): ReactiveValue<Color | undefined> {
    return this.getGeometryElement(context).fill;
  }
}
