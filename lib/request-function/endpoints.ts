import { Context } from '../request-object/context';
import { RequestObjectById } from '../request-object/request-object';

import { Identifier } from 'lib/animation';
import { Coordinate, Position } from 'lib/data-types';
import { ReactiveValue } from 'lib/reactive-values';
import { CoordinateRequestObjectById } from 'lib/request-object';

// Start point functions
export function $start(id: Identifier): RequestStart {
  return new RequestStart(id);
}

export class RequestStart extends RequestObjectById<Position | undefined> {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<Position | undefined> {
    return this.getGeometryElement(context).getStart();
  }
}

export function $startX(id: Identifier): RequestStartX {
  return new RequestStartX(id);
}

export class RequestStartX extends CoordinateRequestObjectById {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<Coordinate | undefined> {
    return this.getGeometryElement(context).getStartX();
  }
}

export function $startY(id: Identifier): RequestStartY {
  return new RequestStartY(id);
}

export class RequestStartY extends CoordinateRequestObjectById {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<Coordinate | undefined> {
    return this.getGeometryElement(context).getStartY();
  }
}

// End point functions
export function $end(id: Identifier): RequestEnd {
  return new RequestEnd(id);
}

export class RequestEnd extends RequestObjectById<Position | undefined> {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<Position | undefined> {
    return this.getGeometryElement(context).getEnd();
  }
}

export function $endX(id: Identifier): RequestEndX {
  return new RequestEndX(id);
}

export class RequestEndX extends CoordinateRequestObjectById {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<Coordinate | undefined> {
    return this.getGeometryElement(context).getEndX();
  }
}

export function $endY(id: Identifier): RequestEndY {
  return new RequestEndY(id);
}

export class RequestEndY extends CoordinateRequestObjectById {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<Coordinate | undefined> {
    return this.getGeometryElement(context).getEndY();
  }
}
