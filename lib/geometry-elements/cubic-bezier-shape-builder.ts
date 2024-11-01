import { Transition } from 'lib/animation';
import { Coordinate, Position } from 'lib/data-types';
import { Easing, easeJumpToEnd } from 'lib/easing';
import { Interpolation, interpolateCoordinate } from 'lib/interpolation';
import {
  ReactiveValue,
  ensureReactive,
  positionToCoordinates,
} from 'lib/reactive-values';
import { Context, RequestFunction } from 'lib/request-functions';

import { CubicBezier } from './cubic-bezier';
import { GeometryElement } from './geometry-element';

export type CubicBezierShapeTransition = {
  startX?: Transition<Coordinate | undefined>;
  startY?: Transition<Coordinate | undefined>;
  control1X?: Transition<Coordinate | undefined>;
  control1Y?: Transition<Coordinate | undefined>;
  control2X?: Transition<Coordinate | undefined>;
  control2Y?: Transition<Coordinate | undefined>;
  endX?: Transition<Coordinate | undefined>;
  endY?: Transition<Coordinate | undefined>;
};

export class CubicBezierShapeTransitionBuilder {
  private _context: Context;
  private _elements: GeometryElement[];
  private _updatedShapes: Map<GeometryElement, CubicBezier>;

  constructor({
    context,
    elements,
    updatedShapes,
  }: {
    context: Context;
    elements: GeometryElement[];
    updatedShapes: Map<GeometryElement, CubicBezier>;
  }) {
    this._context = context;
    this._elements = elements;
    this._updatedShapes = updatedShapes;

    this._elements.forEach((element) => {
      const startX = element.getStartX().unwrap();
      const startY = element.getStartY().unwrap();
      const control1X = element.getControl1X().unwrap();
      const control1Y = element.getControl1Y().unwrap();
      const control2X = element.getControl2X().unwrap();
      const control2Y = element.getControl2Y().unwrap();
      const endX = element.getEndX().unwrap();
      const endY = element.getEndY().unwrap();

      const cubicBezier = new CubicBezier();
      cubicBezier.startX.wrap(startX);
      cubicBezier.startY.wrap(startY);
      cubicBezier.control1X.wrap(control1X);
      cubicBezier.control1Y.wrap(control1Y);
      cubicBezier.control2X.wrap(control2X);
      cubicBezier.control2Y.wrap(control2Y);
      cubicBezier.endX.wrap(endX);
      cubicBezier.endY.wrap(endY);
    });
  }

  /**
   * Transitions the x-coordinate of the starting point of the cubic bezier curve.
   * @param startX - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#cubic_b%C3%A9zier_curve
   */
  public startX(
    startX:
      | RequestFunction<Coordinate | undefined>
      | ReactiveValue<Coordinate | undefined>
      | Coordinate
      | undefined
      | number,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CubicBezierShapeTransitionBuilder {
    if (typeof startX === 'function') {
      startX = startX(this._context);
    } else if (typeof startX === 'number') {
      startX = new Coordinate(startX);
    }

    startX = ensureReactive(startX);

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      this._updatedShapes
        .get(element)!
        .startX.wrap(
          interpolation(element.getStartX().unwrap(), startX, progress),
        );
    });

    return this;
  }

  /**
   * Transitions the y-coordinate of the starting point of the cubic bezier curve.
   * @param startY - The y-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#cubic_b%C3%A9zier_curve
   */
  public startY(
    startY:
      | RequestFunction<Coordinate | undefined>
      | ReactiveValue<Coordinate | undefined>
      | Coordinate
      | undefined
      | number,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CubicBezierShapeTransitionBuilder {
    if (typeof startY === 'function') {
      startY = startY(this._context);
    } else if (typeof startY === 'number') {
      startY = new Coordinate(startY);
    }

    startY = ensureReactive(startY);

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      this._updatedShapes
        .get(element)!
        .startY.wrap(
          interpolation(element.getStartY().unwrap(), startY, progress),
        );
    });

    return this;
  }

  /**
   * Transitions the starting point of the line.
   * @param start - The starting position to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   */
  public start(
    start:
      | RequestFunction<Position | undefined>
      | ReactiveValue<Position | undefined>
      | Position
      | undefined,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CubicBezierShapeTransitionBuilder {
    if (typeof start === 'function') {
      start = start(this._context);
    }

    start = ensureReactive(start);

    const { x, y } = positionToCoordinates(start);

    this.startX(x, { easing, interpolation });
    this.startY(y, { easing, interpolation });

    return this;
  }

  /**
   * Transitions the x-coordinate of the first control point of the cubic bezier curve.
   * @param control1X - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#cubic_b%C3%A9zier_curve
   */
  public control1X(
    control1X:
      | RequestFunction<Coordinate | undefined>
      | ReactiveValue<Coordinate | undefined>
      | Coordinate
      | undefined
      | number,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CubicBezierShapeTransitionBuilder {
    if (typeof control1X === 'function') {
      control1X = control1X(this._context);
    } else if (typeof control1X === 'number') {
      control1X = new Coordinate(control1X);
    }

    control1X = ensureReactive(control1X);

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      this._updatedShapes
        .get(element)!
        .control1X.wrap(
          interpolation(element.getControl1X().unwrap(), control1X, progress),
        );
    });

    return this;
  }

  /**
   * Transitions the y-coordinate of the first control point of the cubic bezier curve.
   * @param control1Y - The y-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#cubic_b%C3%A9zier_curve
   */
  public control1Y(
    control1Y:
      | RequestFunction<Coordinate | undefined>
      | ReactiveValue<Coordinate | undefined>
      | Coordinate
      | undefined
      | number,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CubicBezierShapeTransitionBuilder {
    if (typeof control1Y === 'function') {
      control1Y = control1Y(this._context);
    } else if (typeof control1Y === 'number') {
      control1Y = new Coordinate(control1Y);
    }

    control1Y = ensureReactive(control1Y);

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      this._updatedShapes
        .get(element)!
        .control1Y.wrap(
          interpolation(element.getControl1Y().unwrap(), control1Y, progress),
        );
    });

    return this;
  }

  /**
   * Transitions the first control point of the cubic bezier curve.
   * @param control1 - The first control point to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   */
  public control1(
    control1:
      | RequestFunction<Position | undefined>
      | ReactiveValue<Position | undefined>
      | Position
      | undefined,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CubicBezierShapeTransitionBuilder {
    if (typeof control1 === 'function') {
      control1 = control1(this._context);
    }

    control1 = ensureReactive(control1);

    const { x, y } = positionToCoordinates(control1);

    this.control1X(x, { easing, interpolation });
    this.control1Y(y, { easing, interpolation });

    return this;
  }

  /**
   * Transitions the x-coordinate of the first control point of the cubic bezier curve.
   * @param control2X - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#cubic_b%C3%A9zier_curve
   */
  public control2X(
    control2X:
      | RequestFunction<Coordinate | undefined>
      | ReactiveValue<Coordinate | undefined>
      | Coordinate
      | undefined
      | number,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CubicBezierShapeTransitionBuilder {
    if (typeof control2X === 'function') {
      control2X = control2X(this._context);
    } else if (typeof control2X === 'number') {
      control2X = new Coordinate(control2X);
    }

    control2X = ensureReactive(control2X);

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      this._updatedShapes
        .get(element)!
        .control2X.wrap(
          interpolation(element.getControl2X().unwrap(), control2X, progress),
        );
    });

    return this;
  }

  /**
   * Transitions the y-coordinate of the second control point of the cubic bezier curve.
   * @param control2Y - The y-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#cubic_b%C3%A9zier_curve
   */
  public control2Y(
    control2Y:
      | RequestFunction<Coordinate | undefined>
      | ReactiveValue<Coordinate | undefined>
      | Coordinate
      | undefined
      | number,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CubicBezierShapeTransitionBuilder {
    if (typeof control2Y === 'function') {
      control2Y = control2Y(this._context);
    } else if (typeof control2Y === 'number') {
      control2Y = new Coordinate(control2Y);
    }

    control2Y = ensureReactive(control2Y);

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      this._updatedShapes
        .get(element)!
        .control2Y.wrap(
          interpolation(element.getControl2Y().unwrap(), control2Y, progress),
        );
    });

    return this;
  }

  /**
   * Transitions the second control point of the cubic bezier curve.
   * @param control2 - The second control point to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   */
  public control2(
    control2:
      | RequestFunction<Position | undefined>
      | ReactiveValue<Position | undefined>
      | Position
      | undefined,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CubicBezierShapeTransitionBuilder {
    if (typeof control2 === 'function') {
      control2 = control2(this._context);
    }

    control2 = ensureReactive(control2);

    const { x, y } = positionToCoordinates(control2);

    this.control2X(x, { easing, interpolation });
    this.control2Y(y, { easing, interpolation });

    return this;
  }

  /**
   * Transitions the x-coordinate of the ending point of the cubic bezier curve.
   * @param endX - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#cubic_b%C3%A9zier_curve
   */
  public endX(
    endX:
      | RequestFunction<Coordinate | undefined>
      | ReactiveValue<Coordinate | undefined>
      | Coordinate
      | undefined
      | number,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CubicBezierShapeTransitionBuilder {
    if (typeof endX === 'function') {
      endX = endX(this._context);
    } else if (typeof endX === 'number') {
      endX = new Coordinate(endX);
    }

    endX = ensureReactive(endX);

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      this._updatedShapes
        .get(element)!
        .endX.wrap(interpolation(element.getEndX().unwrap(), endX, progress));
    });

    return this;
  }

  /**
   * Transitions the y-coordinate of the ending point of the cubic bezier curve.
   * @param endY - The y-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#cubic_b%C3%A9zier_curve
   */
  public endY(
    endY:
      | RequestFunction<Coordinate | undefined>
      | ReactiveValue<Coordinate | undefined>
      | Coordinate
      | undefined
      | number,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CubicBezierShapeTransitionBuilder {
    if (typeof endY === 'function') {
      endY = endY(this._context);
    } else if (typeof endY === 'number') {
      endY = new Coordinate(endY);
    }

    endY = ensureReactive(endY);

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      this._updatedShapes
        .get(element)!
        .endY.wrap(interpolation(element.getEndY().unwrap(), endY, progress));
    });

    return this;
  }

  /**
   * Transitions the ending point of the line.
   * @param end - The ending position to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   */
  public end(
    end:
      | RequestFunction<Position | undefined>
      | ReactiveValue<Position | undefined>
      | Position
      | undefined,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CubicBezierShapeTransitionBuilder {
    if (typeof end === 'function') {
      end = end(this._context);
    }

    end = ensureReactive(end);

    const { x, y } = positionToCoordinates(end);

    this.endX(x, { easing, interpolation });
    this.endY(y, { easing, interpolation });

    return this;
  }
}
