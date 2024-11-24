import { Context } from '../request-object/context';
import { RequestObjectById } from '../request-object/request-object';

import { Identifier } from 'lib/animation';
import {
  Delta,
  Length,
  StrokeDasharray,
  StrokeLinecap,
  StrokeLinejoin,
} from 'lib/data-types';
import { ReactiveValue } from 'lib/reactive-values';
import {
  DeltaRequestObjectById,
  LengthRequestObjectById,
} from 'lib/request-object';

export function $strokeLinecap(id: Identifier): RequestStrokeLinecap {
  return new RequestStrokeLinecap(id);
}

export class RequestStrokeLinecap extends RequestObjectById<
  StrokeLinecap | undefined
> {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<StrokeLinecap | undefined> {
    return this.getGeometryElement(context).strokeLinecap;
  }
}

export function $strokeLinejoin(id: Identifier): RequestStrokeLinejoin {
  return new RequestStrokeLinejoin(id);
}

export class RequestStrokeLinejoin extends RequestObjectById<
  StrokeLinejoin | undefined
> {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<StrokeLinejoin | undefined> {
    return this.getGeometryElement(context).strokeLinejoin;
  }
}

export function $strokeMiterlimit(id: Identifier): RequestStrokeMiterlimit {
  return new RequestStrokeMiterlimit(id);
}

export class RequestStrokeMiterlimit extends DeltaRequestObjectById {
  public getReactiveValue(context: Context): ReactiveValue<Delta | undefined> {
    return this.getGeometryElement(context).strokeMiterlimit;
  }
}

export function $strokeDasharray(id: Identifier): RequestStrokeDasharray {
  return new RequestStrokeDasharray(id);
}

export class RequestStrokeDasharray extends RequestObjectById<
  StrokeDasharray | undefined
> {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<StrokeDasharray | undefined> {
    return this.getGeometryElement(context).strokeDasharray;
  }
}

export function $strokeDashoffset(id: Identifier): RequestStrokeDashoffset {
  return new RequestStrokeDashoffset(id);
}

export class RequestStrokeDashoffset extends LengthRequestObjectById {
  public getReactiveValue(context: Context): ReactiveValue<Length | undefined> {
    return this.getGeometryElement(context).strokeDashoffset;
  }
}
