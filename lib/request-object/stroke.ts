import { Identifier } from 'lib/animation';
import { Color, Length } from 'lib/data-types';
import { ReactiveValue } from 'lib/reactive-values';

import { Context } from './context';
import { RequestObjectById } from './request-object';

export function $stroke(id: Identifier): RequestStroke {
  return new RequestStroke(id);
}

export class RequestStroke extends RequestObjectById<Color | undefined> {
  public getReactiveValue(context: Context): ReactiveValue<Color | undefined> {
    return this.getGeometryElement(context).stroke;
  }
}

export function $strokeWidth(id: Identifier): RequestStrokeWidth {
  return new RequestStrokeWidth(id);
}

export class RequestStrokeWidth extends RequestObjectById<Length | undefined> {
  public getReactiveValue(context: Context): ReactiveValue<Length | undefined> {
    return this.getGeometryElement(context).strokeWidth;
  }
}
