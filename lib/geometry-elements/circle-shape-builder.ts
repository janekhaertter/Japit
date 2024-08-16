import { Transition } from 'lib/animation';
import { Coordinate, Length } from 'lib/data-types';
import { Easing, easeInOutQubic } from 'lib/easing';
import {
  Interpolation,
  interpolateCoordinate,
  interpolateLength,
} from 'lib/interpolation';
import { ReactiveValue, ensureReactive } from 'lib/reactive-values';
import { Context, RequestFunction } from 'lib/request-functions';

import { GeometryElement } from './geometry-element';

export type CircleShapeTransition = {
  centerX: Transition<Coordinate | undefined> | undefined;
  centerY: Transition<Coordinate | undefined> | undefined;
  radius: Transition<Length | undefined> | undefined;
};

export class CircleShapeTransitionBuilder {
  private _centerX?: Transition<Coordinate | undefined>;
  private _centerY?: Transition<Coordinate | undefined>;
  private _radius?: Transition<Length | undefined>;
  private _context: Context;

  constructor({ context }: { context: Context }) {
    this._context = context;
  }

  public build(): CircleShapeTransition {
    return {
      centerX: this._centerX,
      centerY: this._centerY,
      radius: this._radius,
    };
  }

  /**
   * Transitions the x-coordinate of the centers the circles.
   * @param centerX - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current CircleShapeBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/cx
   */
  public centerX(
    centerX:
      | RequestFunction<Coordinate | undefined>
      | ReactiveValue<Coordinate | undefined>
      | Coordinate
      | undefined
      | number,
    {
      easing = easeInOutQubic,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CircleShapeTransitionBuilder {
    if (typeof centerX === 'function') {
      centerX = centerX(this._context);
    } else if (typeof centerX === 'number') {
      centerX = new Coordinate(centerX);
    }

    centerX = ensureReactive(centerX);

    this._centerX = {
      to: centerX,
      easing,
      interpolation,
    };

    return this;
  }

  /**
   * Transitions the y-coordinate of the centers the currently selected circles.
   * @param centerY - The y-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current CircleShapeBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/cy
   */
  public centerY(
    centerY:
      | ReactiveValue<Coordinate | undefined>
      | Coordinate
      | undefined
      | number,
    {
      easing = easeInOutQubic,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CircleShapeTransitionBuilder {
    if (typeof centerY === 'number') {
      centerY = new Coordinate(centerY);
    }

    centerY = ensureReactive(centerY);

    this._centerY = {
      to: centerY,
      easing,
      interpolation,
    };

    return this;
  }

  /**
   * Transitions the radius of the currently selected circles.
   * @param radius - The radius to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current CircleShapeBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/r
   */
  public radius(
    radius: ReactiveValue<Length | undefined> | Length | undefined | number,
    {
      easing = easeInOutQubic,
      interpolation = interpolateLength,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Length | undefined>;
    } = {},
  ): CircleShapeTransitionBuilder {
    if (typeof radius === 'number') {
      radius = new Length(radius);
    }

    radius = ensureReactive(radius);

    this._radius = {
      to: radius,
      easing,
      interpolation,
    };

    return this;
  }
}
