import { GeometryElement } from 'lib/geometry-elements';

import { Identifier } from './identifier';

export function flattenIdentifiers(
  identifiers: Iterable<
    Identifier | GeometryElement | Iterable<Identifier | GeometryElement>
  >,
): (Identifier | GeometryElement)[] {
  const res: (Identifier | GeometryElement)[] = [];

  for (const identifier of identifiers) {
    if (
      identifier instanceof GeometryElement ||
      typeof identifier === 'string' ||
      typeof identifier === 'number' ||
      typeof identifier === 'symbol'
    ) {
      res.push(identifier);
    } else {
      for (const id of identifier) {
        res.push(id);
      }
    }
  }
  return res;
}
