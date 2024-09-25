import { Transition } from 'lib/animation';
import { Coordinate, Length, Position } from 'lib/data-types';
import { Easing, easeInOutCubic } from 'lib/easing';
import {
  Interpolation,
  interpolateCoordinate,
  interpolateLength,
} from 'lib/interpolation';
import {
  ReactiveValue,
  ensureReactive,
  positionToCoordinates,
} from 'lib/reactive-values';
import { Context, RequestFunction } from 'lib/request-functions';

export type CircleShapeTransition = {
  centerX: Transition<Coordinate | undefined> | undefined;
  centerY: Transition<Coordinate | undefined> | undefined;
  radius: Transition<Length | undefined> | undefined;
};

export class CircleShapeTransitionBuilder {
  private _context: Context;

  private _centerX?: Transition<Coordinate | undefined>;
  private _centerY?: Transition<Coordinate | undefined>;
  private _radius?: Transition<Length | undefined>;

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
      easing = easeInOutCubic,
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
      | RequestFunction<Coordinate | undefined>
      | ReactiveValue<Coordinate | undefined>
      | Coordinate
      | undefined
      | number,
    {
      easing = easeInOutCubic,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CircleShapeTransitionBuilder {
    if (typeof centerY === 'function') {
      centerY = centerY(this._context);
    } else if (typeof centerY === 'number') {
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
   * Transitions the center of the currently selected circles.
   * @param center - The center position to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current CircleShapeBuilder instance.
   */
  public center(
    center:
      | RequestFunction<Position | undefined>
      | ReactiveValue<Position | undefined>
      | Position
      | undefined,
    {
      easing = easeInOutCubic,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CircleShapeTransitionBuilder {
    if (typeof center === 'function') {
      center = center(this._context);
    }

    center = ensureReactive(center);

    const { x, y } = positionToCoordinates(center);

    this.centerX(x, { easing, interpolation });
    this.centerY(y, { easing, interpolation });

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
    radius:
      | RequestFunction<Length | undefined>
      | ReactiveValue<Length | undefined>
      | Length
      | undefined
      | number,
    {
      easing = easeInOutCubic,
      interpolation = interpolateLength,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Length | undefined>;
    } = {},
  ): CircleShapeTransitionBuilder {
    if (typeof radius === 'function') {
      radius = radius(this._context);
    } else if (typeof radius === 'number') {
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
