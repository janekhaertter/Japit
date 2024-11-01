import { Transition } from 'lib/animation';
import { Coordinate, Length } from 'lib/data-types';
import { Easing, easeJumpToEnd } from 'lib/easing';
import {
  Interpolation,
  interpolateCoordinate,
  interpolateLength,
} from 'lib/interpolation';
import { ReactiveValue, ensureReactive } from 'lib/reactive-values';
import { Context, RequestFunction } from 'lib/request-functions';

import { GeometryElement } from './geometry-element';
import { Rectangle } from './rectangle';

export type RectangleShapeTransition = {
  x: Transition<Coordinate | undefined> | undefined;
  y: Transition<Coordinate | undefined> | undefined;
  width: Transition<Length | undefined> | undefined;
  height: Transition<Length | undefined> | undefined;
  cornerRadiusX: Transition<Length | undefined> | undefined;
  cornerRadiusY: Transition<Length | undefined> | undefined;
};

export class RectangleShapeBuilder {
  private _context: Context;
  private _elements: GeometryElement[];
  private _updatedShapes: Map<GeometryElement, Rectangle>;

  constructor({
    context,
    elements,
    updatedShapes,
  }: {
    context: Context;
    elements: GeometryElement[];
    updatedShapes: Map<GeometryElement, Rectangle>;
  }) {
    this._context = context;
    this._elements = elements;
    this._updatedShapes = updatedShapes;

    this._elements.forEach((element) => {
      const x = element.getTopLeftX().unwrap();
      const y = element.getTopLeftY().unwrap();
      const width = element.getWidth().unwrap();
      const height = element.getHeight().unwrap();
      const rx = element.getRadiusX().unwrap();
      const ry = element.getRadiusY().unwrap();

      const rectangle = new Rectangle();
      rectangle.x.wrap(x);
      rectangle.y.wrap(y);
      rectangle.width.wrap(width);
      rectangle.height.wrap(height);
      rectangle.rx.wrap(rx);
      rectangle.ry.wrap(ry);

      this._updatedShapes.set(element, rectangle);
    });
  }

  /**
   * Transitions the x-coordinate of the top left corner of the rectangles.
   * @param x - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current RectangleShapeBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/x
   */
  public topLeftX(
    x:
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
  ): RectangleShapeBuilder {
    if (typeof x === 'function') {
      x = x(this._context);
    } else if (typeof x === 'number') {
      x = new Coordinate(x);
    }

    x = ensureReactive(x);

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      this._updatedShapes
        .get(element)!
        .x.wrap(interpolation(element.getTopLeftX().unwrap(), x, progress));
    });

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
  public topLeftY(
    y:
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
  ): RectangleShapeBuilder {
    if (typeof y === 'function') {
      y = y(this._context);
    } else if (typeof y === 'number') {
      y = new Coordinate(y);
    }

    y = ensureReactive(y);

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      this._updatedShapes
        .get(element)!
        .y.wrap(interpolation(element.getTopLeftY().unwrap(), y, progress));
    });

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
    width:
      | RequestFunction<Length | undefined>
      | ReactiveValue<Length | undefined>
      | Length
      | undefined
      | number,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateLength,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Length | undefined>;
    } = {},
  ): RectangleShapeBuilder {
    if (typeof width === 'function') {
      width = width(this._context);
    } else if (typeof width === 'number') {
      width = new Length(width);
    }

    width = ensureReactive(width);

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      this._updatedShapes
        .get(element)!
        .width.wrap(
          interpolation(element.getWidth().unwrap(), width, progress),
        );
    });

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
    height:
      | RequestFunction<Length | undefined>
      | ReactiveValue<Length | undefined>
      | Length
      | undefined
      | number,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateLength,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Length | undefined>;
    } = {},
  ): RectangleShapeBuilder {
    if (typeof height === 'function') {
      height = height(this._context);
    } else if (typeof height === 'number') {
      height = new Length(height);
    }

    height = ensureReactive(height);

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      this._updatedShapes
        .get(element)!
        .height.wrap(
          interpolation(element.getHeight().unwrap(), height, progress),
        );
    });

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
      | RequestFunction<Length | undefined>
      | ReactiveValue<Length | undefined>
      | Length
      | undefined
      | number,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateLength,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Length | undefined>;
    } = {},
  ): RectangleShapeBuilder {
    if (typeof cornerRadiusX === 'function') {
      cornerRadiusX = cornerRadiusX(this._context);
    } else if (typeof cornerRadiusX === 'number') {
      cornerRadiusX = new Length(cornerRadiusX);
    }

    cornerRadiusX = ensureReactive(cornerRadiusX);

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      this._updatedShapes
        .get(element)!
        .rx.wrap(
          interpolation(element.getRadiusX().unwrap(), cornerRadiusX, progress),
        );
    });

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
      | RequestFunction<Length | undefined>
      | ReactiveValue<Length | undefined>
      | Length
      | undefined
      | number,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateLength,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Length | undefined>;
    } = {},
  ): RectangleShapeBuilder {
    if (typeof cornerRadiusY === 'function') {
      cornerRadiusY = cornerRadiusY(this._context);
    } else if (typeof cornerRadiusY === 'number') {
      cornerRadiusY = new Length(cornerRadiusY);
    }

    cornerRadiusY = ensureReactive(cornerRadiusY);

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      this._updatedShapes
        .get(element)!
        .ry.wrap(
          interpolation(element.getRadiusY().unwrap(), cornerRadiusY, progress),
        );
    });

    return this;
  }
}
