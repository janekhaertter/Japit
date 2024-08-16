import { Transition } from 'lib/animation';
import { Coordinate } from 'lib/data-types';
import { Easing, easeInOutQubic } from 'lib/easing';
import { Interpolation, interpolateCoordinate } from 'lib/interpolation';
import { ReactiveValue, ensureReactive } from 'lib/reactive-values';

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
  private _startX?: Transition<Coordinate | undefined>;
  private _startY?: Transition<Coordinate | undefined>;
  private _control1X?: Transition<Coordinate | undefined>;
  private _control1Y?: Transition<Coordinate | undefined>;
  private _control2X?: Transition<Coordinate | undefined>;
  private _control2Y?: Transition<Coordinate | undefined>;
  private _endX?: Transition<Coordinate | undefined>;
  private _endY?: Transition<Coordinate | undefined>;

  public build(): CubicBezierShapeTransition {
    return {
      startX: this._startX,
      startY: this._startY,
      control1X: this._control1X,
      control1Y: this._control1Y,
      control2X: this._control2X,
      control2Y: this._control2Y,
      endX: this._endX,
      endY: this._endY,
    };
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
  ): CubicBezierShapeTransitionBuilder {
    if (typeof startX === 'number') {
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
   * Transitions the y-coordinate of the starting point of the cubic bezier curve.
   * @param startY - The y-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#cubic_b%C3%A9zier_curve
   */
  public startY(
    startY:
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
  ): CubicBezierShapeTransitionBuilder {
    if (typeof startY === 'number') {
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
   * Transitions the x-coordinate of the first control point of the cubic bezier curve.
   * @param control1X - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#cubic_b%C3%A9zier_curve
   */
  public control1X(
    control1X:
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
  ): CubicBezierShapeTransitionBuilder {
    if (typeof control1X === 'number') {
      control1X = new Coordinate(control1X);
    }

    control1X = ensureReactive(control1X);

    this._control1X = {
      to: control1X,
      easing,
      interpolation,
    };

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
  ): CubicBezierShapeTransitionBuilder {
    if (typeof control1Y === 'number') {
      control1Y = new Coordinate(control1Y);
    }

    control1Y = ensureReactive(control1Y);

    this._control1Y = {
      to: control1Y,
      easing,
      interpolation,
    };

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
  ): CubicBezierShapeTransitionBuilder {
    if (typeof control2X === 'number') {
      control2X = new Coordinate(control2X);
    }

    control2X = ensureReactive(control2X);

    this._control2X = {
      to: control2X,
      easing,
      interpolation,
    };

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
  ): CubicBezierShapeTransitionBuilder {
    if (typeof control2Y === 'number') {
      control2Y = new Coordinate(control2Y);
    }

    control2Y = ensureReactive(control2Y);

    this._control2Y = {
      to: control2Y,
      easing,
      interpolation,
    };

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
  ): CubicBezierShapeTransitionBuilder {
    if (typeof endX === 'number') {
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
   * Transitions the y-coordinate of the ending point of the cubic bezier curve.
   * @param endY - The y-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link CubicBezierShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#cubic_b%C3%A9zier_curve
   */
  public endY(
    endY:
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
  ): CubicBezierShapeTransitionBuilder {
    if (typeof endY === 'number') {
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
