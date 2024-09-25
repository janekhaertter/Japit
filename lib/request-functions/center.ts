import { Identifier } from 'lib/animation';
import { Coordinate, Position } from 'lib/data-types';
import { GeometryElement } from 'lib/geometry-elements';

import { RequestFunction } from './request-function';

export function $centerX(
  id: Identifier | GeometryElement,
): RequestFunction<Coordinate | undefined> {
  return ({ geometryElementManager }) => {
    return geometryElementManager.requestGeometryElements(id)[0].getCenterX();
  };
}

export function $centerY(
  id: Identifier | GeometryElement,
): RequestFunction<Coordinate | undefined> {
  return ({ geometryElementManager }) => {
    return geometryElementManager.requestGeometryElements(id)[0].getCenterY();
  };
}

export function $center(
  id: Identifier | GeometryElement,
): RequestFunction<Position | undefined> {
  return ({ geometryElementManager }) => {
    return geometryElementManager.requestGeometryElements(id)[0].getCenter();
  };
}
