import { Context } from '../request-object/context';

import { Identifier } from 'lib/animation';
import { Coordinate, Position } from 'lib/data-types';
import { ReactiveValue } from 'lib/reactive-values';
import {
  CoordinateRequestObjectById,
  RequestObjectById,
} from 'lib/request-object';

export function $control1(id: Identifier): RequestControl1 {
  return new RequestControl1(id);
}

export class RequestControl1 extends RequestObjectById<Position | undefined> {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<Position | undefined> {
    const element = this.getGeometryElement(context);
    return element.getControl1();
  }
}

export function $control2(id: Identifier): RequestControl2 {
  return new RequestControl2(id);
}

export class RequestControl2 extends RequestObjectById<Position | undefined> {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<Position | undefined> {
    return this.getGeometryElement(context).getControl2();
  }
}

export function $control1X(id: Identifier): RequestControl1X {
  return new RequestControl1X(id);
}

export class RequestControl1X extends CoordinateRequestObjectById {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<Coordinate | undefined> {
    return this.getGeometryElement(context).getControl1X();
  }
}

export function $control1Y(id: Identifier): RequestControl1Y {
  return new RequestControl1Y(id);
}

export class RequestControl1Y extends CoordinateRequestObjectById {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<Coordinate | undefined> {
    return this.getGeometryElement(context).getControl1Y();
  }
}

export function $control2X(id: Identifier): RequestControl2X {
  return new RequestControl2X(id);
}

export class RequestControl2X extends CoordinateRequestObjectById {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<Coordinate | undefined> {
    return this.getGeometryElement(context).getControl2X();
  }
}

export function $control2Y(id: Identifier): RequestControl2Y {
  return new RequestControl2Y(id);
}

export class RequestControl2Y extends CoordinateRequestObjectById {
  public getReactiveValue(
    context: Context,
  ): ReactiveValue<Coordinate | undefined> {
    return this.getGeometryElement(context).getControl2Y();
  }
}
