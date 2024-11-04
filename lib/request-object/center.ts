import { Identifier } from 'lib/animation';
import { Coordinate, Position } from 'lib/data-types';
import { ReactiveValue } from 'lib/reactive-values';

import { Context } from './context';
import { RequestObjectById } from './request-object';

export function $center(id: Identifier): RequestCenter {
  return new RequestCenter(id);
}

export class RequestCenter extends RequestObjectById<Position | undefined> {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<Position | undefined> {
    return this.getGeometryElement(context).getCenter();
  }
}

export function $centerX(id: Identifier): RequestCenterX {
  return new RequestCenterX(id);
}

export class RequestCenterX extends RequestObjectById<Coordinate | undefined> {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<Coordinate | undefined> {
    return this.getGeometryElement(context).getCenterX();
  }
}

export function $centerY(id: Identifier): RequestCenterY {
  return new RequestCenterY(id);
}

export class RequestCenterY extends RequestObjectById<Coordinate | undefined> {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<Coordinate | undefined> {
    return this.getGeometryElement(context).getCenterY();
  }
}
