import { AnimationPlayer } from '../svg-controller/animation-player';

import { AlphaValue } from 'lib/data-types';
import { Drawing } from 'lib/svg-controller/drawing';

import { Animatable } from './animatable';
import { buildSequentialAnimation } from './build-sequential-animation';
import { GeometryElementManager } from './geometry-element-manager';
import { UpdatedValuesMap } from './updated-values-map';

export function createAnimation(
  svg: SVGSVGElement,
  animatables: Animatable[],
): AnimationPlayer {
  const geometryElementManager = new GeometryElementManager();
  const updatedValues: UpdatedValuesMap = new Map();

  const animation = buildSequentialAnimation({
    animatables,
    geometryElementManager,
    updatedValues,
  });

  updatedValues.forEach((newValue, wrappedValue) => {
    wrappedValue.wrap(newValue);
  });

  const drawing = new Drawing(svg);
  drawing.addGeometryElements(geometryElementManager.getGeometryElements());

  const player = new AnimationPlayer({
    duration: animation.duration,
    progress: animation.progress,
    drawing,
    marks: animation.marks,
  });
  player.seekProgress(new AlphaValue(0));

  return player;
}
