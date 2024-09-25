import { Transition } from 'lib/animation';
import { Coordinate } from 'lib/data-types';
import { Easing, easeInOutQubic } from 'lib/easing';
import { Interpolation, interpolateCoordinate } from 'lib/interpolation';
import { ReactiveValue, ensureReactive } from 'lib/reactive-values';
import { Context, RequestFunction } from 'lib/request-functions';

export type LineShapeTransition = {
  startX: Transition<Coordinate | undefined> | undefined;
  startY: Transition<Coordinate | undefined> | undefined;
  endX: Transition<Coordinate | undefined> | undefined;
  endY: Transition<Coordinate | undefined> | undefined;
};

export class LineShapeTransitionBuilder {
  private _context: Context;

  private _startX?: Transition<Coordinate | undefined>;
  private _startY?: Transition<Coordinate | undefined>;
  private _endX?: Transition<Coordinate | undefined>;
  private _endY?: Transition<Coordinate | undefined>;

  constructor({ context }: { context: Context }) {
    this._context = context;
  }

  public build(): LineShapeTransition {
    return {
      startX: this._startX,
      startY: this._startY,
      endX: this._endX,
      endY: this._endY,
    };
  }

  /**
   * Transitions the x-coordinate of the starting point of the line.
   * @param startX - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link LineShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/x1
   */
  public startX(
    startX:
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
  ): LineShapeTransitionBuilder {
    if (typeof startX === 'function') {
      startX = startX(this._context);
    } else if (typeof startX === 'number') {
      startX = new Coordinate(startX);
    }

    startX = ensureReactive(startX);

    this._startX = {
      to: startX,
      easing,
      interpolation,
    };

    return this;
  }

  /**
   * Transitions the y-coordinate of the starting point of the line.
   * @param startY - The y-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link LineShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/y1
   */
  public startY(
    startY:
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
  ): LineShapeTransitionBuilder {
    if (typeof startY === 'function') {
      startY = startY(this._context);
    } else if (typeof startY === 'number') {
      startY = new Coordinate(startY);
    }

    startY = ensureReactive(startY);

    this._startY = {
      to: startY,
      easing,
      interpolation,
    };

    return this;
  }

  /**
   * Transitions the x-coordinate of the ending point of the line.
   * @param endX - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link LineShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/x2
   */
  public endX(
    endX:
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
  ): LineShapeTransitionBuilder {
    if (typeof endX === 'function') {
      endX = endX(this._context);
    } else if (typeof endX === 'number') {
      endX = new Coordinate(endX);
    }

    endX = ensureReactive(endX);

    this._endX = {
      to: endX,
      easing,
      interpolation,
    };

    return this;
  }

  /**
   * Transitions the y-coordinate of the ending point of the line.
   * @param endY - The y-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link LineShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/y2
   */
  public endY(
    endY:
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
  ): LineShapeTransitionBuilder {
    if (typeof endY === 'function') {
      endY = endY(this._context);
    } else if (typeof endY === 'number') {
      endY = new Coordinate(endY);
    }

    endY = ensureReactive(endY);

    this._endY = {
      to: endY,
      easing,
      interpolation,
    };

    return this;
  }
}
