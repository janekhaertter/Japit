import { Drawing } from 'lib/drawing/drawing';

import { Animatable } from './animatable';
import { AnimationPlayer } from './animation-player';
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
  });
  player.seek(0);

  return player;
}
