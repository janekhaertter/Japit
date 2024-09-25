import { Identifier } from 'lib/animation';
import { Color } from 'lib/data-types';
import { GeometryElement } from 'lib/geometry-elements';

import { RequestFunction } from './request-function';

export function $fill(
  id: Identifier | GeometryElement,
): RequestFunction<Color | undefined> {
  return ({ geometryElementManager }) => {
    return geometryElementManager.requestGeometryElements(id)[0].fill;
  };
}
