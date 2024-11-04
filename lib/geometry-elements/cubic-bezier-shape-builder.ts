import { Transition } from 'lib/animation';
import { Coordinate, Position } from 'lib/data-types';
import { Easing, easeJumpToEnd } from 'lib/easing';
import { Interpolation, interpolateCoordinate } from 'lib/interpolation';
import {
  PrimitiveReactiveValue,
  SimpleWrappedReactiveValue,
  positionToCoordinates,
} from 'lib/reactive-values';
import { Context, RequestObject } from 'lib/request-object';

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

      this._updatedShapes.set(element, cubicBezier);
    });
  }

  private _plainHelper<T extends Exclude<any, RequestObject<any>>>(
    arg: RequestObject<T> | T,
    {
      easing,
      interpolation,
    }: {
      easing: Easing;
      interpolation: Interpolation<T>;
    },
    valueExtractor: (cubicBezier: CubicBezier) => SimpleWrappedReactiveValue<T>,
    oldValueExtractor: (
      element: GeometryElement,
    ) => SimpleWrappedReactiveValue<T>,
  ): CubicBezierShapeTransitionBuilder {
    const parsed =
      arg instanceof RequestObject
        ? arg.getReactiveValue(this._context)
        : new PrimitiveReactiveValue(arg);

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      valueExtractor(this._updatedShapes.get(element)!).wrap(
        interpolation(oldValueExtractor(element).unwrap(), parsed, progress),
      );
    });

    return this;
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
      | RequestObject<Coordinate | undefined>
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
    if (typeof startX === 'number') {
      startX = new Coordinate(startX);
    }

    return this._plainHelper(
      startX,
      { easing, interpolation },
      (cubicBezier) => cubicBezier.startX,
      (element) => element.getStartX(),
    );
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
      | RequestObject<Coordinate | undefined>
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
    if (typeof startY === 'number') {
      startY = new Coordinate(startY);
    }

    return this._plainHelper(
      startY,
      { easing, interpolation },
      (cubicBezier) => cubicBezier.startY,
      (element) => element.getStartY(),
    );
  }

  /**
   * Transitions the starting point of the line.
   * @param start - The starting position to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   */
  public start(
    start: RequestObject<Position | undefined> | Position | undefined,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CubicBezierShapeTransitionBuilder {
    const parsed =
      start instanceof RequestObject
        ? start.getReactiveValue(this._context)
        : new PrimitiveReactiveValue(start);

    const { x, y } = positionToCoordinates(parsed);

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
      | RequestObject<Coordinate | undefined>
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
    if (typeof control1X === 'number') {
      control1X = new Coordinate(control1X);
    }

    return this._plainHelper(
      control1X,
      { easing, interpolation },
      (cubicBezier) => cubicBezier.control1X,
      (element) => element.getControl1X(),
    );
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
      | RequestObject<Coordinate | undefined>
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
    if (typeof control1Y === 'number') {
      control1Y = new Coordinate(control1Y);
    }

    return this._plainHelper(
      control1Y,
      { easing, interpolation },
      (cubicBezier) => cubicBezier.control1Y,
      (element) => element.getControl1Y(),
    );
  }

  /**
   * Transitions the first control point of the cubic bezier curve.
   * @param control1 - The first control point to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   */
  public control1(
    control1: RequestObject<Position | undefined> | Position | undefined,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CubicBezierShapeTransitionBuilder {
    const parsed =
      control1 instanceof RequestObject
        ? control1.getReactiveValue(this._context)
        : new PrimitiveReactiveValue(control1);

    const { x, y } = positionToCoordinates(parsed);

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
      | RequestObject<Coordinate | undefined>
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
    if (typeof control2X === 'number') {
      control2X = new Coordinate(control2X);
    }

    return this._plainHelper(
      control2X,
      { easing, interpolation },
      (cubicBezier) => cubicBezier.control2X,
      (element) => element.getControl2X(),
    );
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
      | RequestObject<Coordinate | undefined>
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
    if (typeof control2Y === 'number') {
      control2Y = new Coordinate(control2Y);
    }

    return this._plainHelper(
      control2Y,
      { easing, interpolation },
      (cubicBezier) => cubicBezier.control2Y,
      (element) => element.getControl2Y(),
    );
  }

  /**
   * Transitions the second control point of the cubic bezier curve.
   * @param control2 - The second control point to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   */
  public control2(
    control2: RequestObject<Position | undefined> | Position | undefined,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CubicBezierShapeTransitionBuilder {
    const parsed =
      control2 instanceof RequestObject
        ? control2.getReactiveValue(this._context)
        : new PrimitiveReactiveValue(control2);

    const { x, y } = positionToCoordinates(parsed);

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
      | RequestObject<Coordinate | undefined>
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
    if (typeof endX === 'number') {
      endX = new Coordinate(endX);
    }

    return this._plainHelper(
      endX,
      { easing, interpolation },
      (cubicBezier) => cubicBezier.endX,
      (element) => element.getEndX(),
    );
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
      | RequestObject<Coordinate | undefined>
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
    if (typeof endY === 'number') {
      endY = new Coordinate(endY);
    }

    return this._plainHelper(
      endY,
      { easing, interpolation },
      (cubicBezier) => cubicBezier.endY,
      (element) => element.getEndY(),
    );
  }

  /**
   * Transitions the ending point of the line.
   * @param end - The ending position to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   */
  public end(
    end: RequestObject<Position | undefined> | Position | undefined,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CubicBezierShapeTransitionBuilder {
    const parsed =
      end instanceof RequestObject
        ? end.getReactiveValue(this._context)
        : new PrimitiveReactiveValue(end);

    const { x, y } = positionToCoordinates(parsed);

    this.endX(x, { easing, interpolation });
    this.endY(y, { easing, interpolation });

    return this;
  }
}
