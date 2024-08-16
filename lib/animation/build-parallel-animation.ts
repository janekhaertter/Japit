import { AlphaValue } from 'lib/data-types';
import {
  FunctionalReactiveValue,
  SimpleWrappedReactiveValue,
  ensureReactive,
} from 'lib/reactive-values';

import { Animatable } from './animatable';
import { buildSequentialAnimation } from './build-sequential-animation';
import { GeometryElementManager } from './geometry-element-manager';
import { UpdatedValuesMap } from './updated-values-map';

export function buildParallelAnimation({
  animatables,
  geometryElementManager,
  updatedValues,
}: {
  animatables: Iterable<Animatable>;
  geometryElementManager: GeometryElementManager;
  updatedValues: UpdatedValuesMap;
}): {
  progress: SimpleWrappedReactiveValue<AlphaValue>;
  duration: number;
} {
  const animations: {
    progress: SimpleWrappedReactiveValue<AlphaValue>;
    duration: number;
  }[] = [];
  let maxDuration = 0;

  const progress = new SimpleWrappedReactiveValue(
    ensureReactive(new AlphaValue(1)),
  );

  for (const animatable of animatables) {
    const animation = buildSequentialAnimation({
      animatables: typeof animatable === 'function' ? [animatable] : animatable,
      geometryElementManager,
      updatedValues,
    });
    animations.push(animation);
    maxDuration = Math.max(maxDuration, animation.duration);
  }

  for (const animation of animations) {
    const duration = animation.duration;
    const animationProgress = new FunctionalReactiveValue(
      [progress],
      ([progress]) => {
        const currentProgress = progress.getValue().getNumber();
        return new AlphaValue(
          duration === 0 ? 1 : (currentProgress * maxDuration) / duration,
        );
      },
    );
    animation.progress.wrap(animationProgress);
  }

  return {
    progress,
    duration: maxDuration,
  };
}
