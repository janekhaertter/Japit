import { Identifier } from 'lib/animation';
import { Length } from 'lib/data-types';
import { GeometryElement } from 'lib/geometry-elements';

import { RequestFunction } from './request-function';

export function $radius(
  id: Identifier | GeometryElement,
): RequestFunction<Length | undefined> {
  return ({ geometryElementManager }) => {
    return geometryElementManager.requestGeometryElements(id)[0].getRadius();
  };
}
