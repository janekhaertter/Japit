import { Transition } from 'lib/animation';
import { Coordinate, Length } from 'lib/data-types';
import { Easing, easeInOutCubic } from 'lib/easing';
import {
  Interpolation,
  interpolateCoordinate,
  interpolateLength,
} from 'lib/interpolation';
import { ReactiveValue, ensureReactive } from 'lib/reactive-values';

export type RectangleShapeTransition = {
  x: Transition<Coordinate | undefined> | undefined;
  y: Transition<Coordinate | undefined> | undefined;
  width: Transition<Length | undefined> | undefined;
  height: Transition<Length | undefined> | undefined;
  cornerRadiusX: Transition<Length | undefined> | undefined;
  cornerRadiusY: Transition<Length | undefined> | undefined;
};

export class RectangleShapeBuilder {
  private _x?: Transition<Coordinate | undefined>;
  private _y?: Transition<Coordinate | undefined>;
  private _width?: Transition<Length | undefined>;
  private _height?: Transition<Length | undefined>;
  private _cornerRadiusX?: Transition<Length | undefined>;
  private _cornerRadiusY?: Transition<Length | undefined>;

  public build(): RectangleShapeTransition {
    return {
      x: this._x,
      y: this._y,
      width: this._width,
      height: this._height,
      cornerRadiusX: this._cornerRadiusX,
      cornerRadiusY: this._cornerRadiusY,
    };
  }

  /**
   * Transitions the x-coordinate of the top left corner of the rectangles.
   * @param x - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current RectangleShapeBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/x
   */
  public x(
    x: ReactiveValue<Coordinate | undefined> | Coordinate | undefined | number,
    {
      easing = easeInOutCubic,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): RectangleShapeBuilder {
    if (typeof x === 'number') {
      x = new Coordinate(x);
    }

    x = ensureReactive(x);

    this._x = {
      to: x,
      easing,
      interpolation,
    };

    return this;
  }

  /**
   * Transitions the y-coordinate of the top left corner of the rectangles.
   * @param y - The y-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current RectangleShapeBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/y
   */
  public y(
    y: ReactiveValue<Coordinate | undefined> | Coordinate | undefined | number,
    {
      easing = easeInOutCubic,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): RectangleShapeBuilder {
    if (typeof y === 'number') {
      y = new Coordinate(y);
    }

    y = ensureReactive(y);

    this._y = {
      to: y,
      easing,
      interpolation,
    };

    return this;
  }

  /**
   * Transitions the width of the rectangles.
   * @param width - The width to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current RectangleShapeBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/width
   */
  public width(
    width: ReactiveValue<Length | undefined> | Length | undefined | number,
    {
      easing = easeInOutCubic,
      interpolation = interpolateLength,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Length | undefined>;
    } = {},
  ): RectangleShapeBuilder {
    if (typeof width === 'number') {
      width = new Length(width);
    }

    width = ensureReactive(width);

    this._width = {
      to: width,
      easing,
      interpolation,
    };

    return this;
  }

  /**
   * Transitions the height of the rectangles.
   * @param height - The height to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current RectangleShapeBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/height
   */
  public height(
    height: ReactiveValue<Length | undefined> | Length | undefined | number,
    {
      easing = easeInOutCubic,
      interpolation = interpolateLength,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Length | undefined>;
    } = {},
  ): RectangleShapeBuilder {
    if (typeof height === 'number') {
      height = new Length(height);
    }

    height = ensureReactive(height);

    this._height = {
      to: height,
      easing,
      interpolation,
    };

    return this;
  }

  /**
   * Transitions the corner radius of the rectangles in x direction.
   * @param cornerRadiusX - The corner radius to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current RectangleShapeBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx
   */
  public cornerRadiusX(
    cornerRadiusX:
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
  ): RectangleShapeBuilder {
    if (typeof cornerRadiusX === 'number') {
      cornerRadiusX = new Length(cornerRadiusX);
    }

    cornerRadiusX = ensureReactive(cornerRadiusX);

    this._cornerRadiusX = {
      to: cornerRadiusX,
      easing,
      interpolation,
    };

    return this;
  }

  /**
   * Transitions the corner radius of the rectangles in y direction.
   * @param cornerRadiusY - The corner radius to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current RectangleShapeBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/ry
   */
  public cornerRadiusY(
    cornerRadiusY:
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
  ): RectangleShapeBuilder {
    if (typeof cornerRadiusY === 'number') {
      cornerRadiusY = new Length(cornerRadiusY);
    }

    cornerRadiusY = ensureReactive(cornerRadiusY);

    this._cornerRadiusY = {
      to: cornerRadiusY,
      easing,
      interpolation,
    };

    return this;
  }
}
