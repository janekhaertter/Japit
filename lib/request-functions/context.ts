import { GeometryElementManager } from 'lib/animation';
import { UpdatedValuesMap } from 'lib/animation/updated-values-map';
import { AlphaValue } from 'lib/data-types';
import { SimpleWrappedReactiveValue } from 'lib/reactive-values';

export type Context = {
  geometryElementManager: GeometryElementManager;
  progress: SimpleWrappedReactiveValue<AlphaValue>;
  oldUpdatedValues: UpdatedValuesMap;
  updatedValues: UpdatedValuesMap;
};
