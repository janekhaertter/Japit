import { Identifier } from 'lib/animation';
import { Color, Length } from 'lib/data-types';
import { GeometryElement } from 'lib/geometry-elements';

import { RequestFunction } from './request-function';

export function $stroke(
  id: Identifier | GeometryElement,
): RequestFunction<Color | undefined> {
  return ({ geometryElementManager }) => {
    return geometryElementManager.requestGeometryElements(id)[0].stroke;
  };
}

export function $strokeWidth(
  id: Identifier | GeometryElement,
): RequestFunction<Length | undefined> {
  return ({ geometryElementManager }) => {
    return geometryElementManager.requestGeometryElements(id)[0].strokeWidth;
  };
}
