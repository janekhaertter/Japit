import { Context } from '../request-object/context';
import { RequestObjectById } from '../request-object/request-object';

import { Identifier } from 'lib/animation';
import { Cursor } from 'lib/data-types';
import { ReactiveValue } from 'lib/reactive-values';

export function $cursor(id: Identifier): RequestCursor {
  return new RequestCursor(id);
}

export class RequestCursor extends RequestObjectById<Cursor | undefined> {
  public getReactiveValue(context: Context): ReactiveValue<Cursor | undefined> {
    return this.getGeometryElement(context).cursor;
  }
}
