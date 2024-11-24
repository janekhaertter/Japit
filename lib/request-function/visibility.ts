import { Context } from '../request-object/context';
import { RequestObjectById } from '../request-object/request-object';

import { Identifier } from 'lib/animation';
import { Visibility } from 'lib/data-types';
import { ReactiveValue } from 'lib/reactive-values';

export function $visibility(id: Identifier): RequestVisibility {
  return new RequestVisibility(id);
}

export class RequestVisibility extends RequestObjectById<
  Visibility | undefined
> {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<Visibility | undefined> {
    return this.getGeometryElement(context).visibility;
  }
}
