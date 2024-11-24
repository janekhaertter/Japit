import { Context } from '../request-object/context';

import { Identifier } from 'lib/animation';
import { AlphaValue } from 'lib/data-types';
import { ReactiveValue } from 'lib/reactive-values';
import { AlphaValueRequestObjectById } from 'lib/request-object';

export function $opacity(id: Identifier): RequestOpacity {
  return new RequestOpacity(id);
}

export class RequestOpacity extends AlphaValueRequestObjectById {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<AlphaValue | undefined> {
    return this.getGeometryElement(context).opacity;
  }
}

export function $fillOpacity(id: Identifier): RequestFillOpacity {
  return new RequestFillOpacity(id);
}

export class RequestFillOpacity extends AlphaValueRequestObjectById {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<AlphaValue | undefined> {
    return this.getGeometryElement(context).fillOpacity;
  }
}

export function $strokeOpacity(id: Identifier): RequestStrokeOpacity {
  return new RequestStrokeOpacity(id);
}

export class RequestStrokeOpacity extends AlphaValueRequestObjectById {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<AlphaValue | undefined> {
    return this.getGeometryElement(context).strokeOpacity;
  }
}
