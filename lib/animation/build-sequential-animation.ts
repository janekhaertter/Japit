import { AlphaValue } from 'lib/data-types';
import {
  FunctionalReactiveValue,
  SimpleWrappedReactiveValue,
  ensureReactive,
} from 'lib/reactive-values';

import { Animatable } from './animatable';
import { AnimationBuilder } from './animation-builder';
import { buildParallelAnimation } from './build-parallel-animation';
import { GeometryElementManager } from './geometry-element-manager';
import { UpdatedValuesMap } from './updated-values-map';

export function buildSequentialAnimation({
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
  // First build all animations
  const animations: {
    progress: SimpleWrappedReactiveValue<AlphaValue>;
    duration: number;
  }[] = [];

  for (const animatable of animatables) {
    let animation;
    // FIRST CASE: animatable instanceof (animationBuilder: AnimationBuilder) => void
    if (typeof animatable === 'function') {
      const builder = new AnimationBuilder({
        geometryElementManager,
        updatedValues,
      });
      animatable(builder);
      animation = builder.build();
    }

    // SECOND CASE: animatable instanceof Animatable[]
    else {
      animation = buildParallelAnimation({
        animatables: animatable,
        geometryElementManager,
        updatedValues,
      });
    }

    // save animation for later
    animations.push(animation);

    updatedValues.forEach((newValue, wrappedValue) => {
      // make sure that we update the values according to the current state to allow later animations to do sth like `circle.radius.getValue()` in order to get the value from the previous animation step
      wrappedValue.wrap(newValue);
    });
  }

  const totalDuration = animations
    .map((animation) => animation.duration)
    .reduce((acc, duration) => acc + duration, 0);

  const progress = new SimpleWrappedReactiveValue(
    ensureReactive(new AlphaValue(1)),
  );

  let currentDuration = 0;
  for (const animation of animations) {
    const startTime = currentDuration;
    animation.progress.wrap(
      new FunctionalReactiveValue([progress], ([progress]) => {
        const currentTime = progress.getValue().getNumber() * totalDuration;
        const newProgress =
          animation.duration === 0
            ? currentTime < startTime
              ? 0
              : 1
            : (currentTime - startTime) / animation.duration;
        return new AlphaValue(newProgress);
      }),
    );
    currentDuration += animation.duration;
  }

  return {
    progress,
    duration: totalDuration,
  };
}
