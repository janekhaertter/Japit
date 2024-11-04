import { Transition } from 'lib/animation';
import { Coordinate, Length } from 'lib/data-types';
import { Easing, easeJumpToEnd } from 'lib/easing';
import {
  Interpolation,
  interpolateCoordinate,
  interpolateLength,
} from 'lib/interpolation';
import { PrimitiveReactiveValue } from 'lib/reactive-values';
import { Context, RequestObject } from 'lib/request-object';

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

  private _plainHelper<T extends Exclude<any, RequestObject<any>>>(
    arg: RequestObject<T> | T,
    {
      easing,
      interpolation,
    }: {
      easing: Easing;
      interpolation: Interpolation<T>;
    },
    valueExtractor: (rectangle: Rectangle) => SimpleWrappedReactiveValue<T>,
    oldValueExtractor: (
      element: GeometryElement,
    ) => SimpleWrappedReactiveValue<T>,
  ): RectangleShapeBuilder {
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
   * Transitions the x-coordinate of the top left corner of the rectangles.
   * @param x - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current RectangleShapeBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/x
   */
  public topLeftX(
    x: RequestObject<Coordinate | undefined> | Coordinate | undefined | number,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): RectangleShapeBuilder {
    if (typeof x === 'number') {
      x = new Coordinate(x);
    }

    return this._plainHelper(
      x,
      { easing, interpolation },
      (rectangle) => rectangle.x,
      (element) => element.getTopLeftX(),
    );
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
    y: RequestObject<Coordinate | undefined> | Coordinate | undefined | number,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): RectangleShapeBuilder {
    if (typeof y === 'number') {
      y = new Coordinate(y);
    }

    return this._plainHelper(
      y,
      { easing, interpolation },
      (rectangle) => rectangle.y,
      (element) => element.getTopLeftY(),
    );
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
    width: RequestObject<Length | undefined> | Length | undefined | number,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateLength,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Length | undefined>;
    } = {},
  ): RectangleShapeBuilder {
    if (typeof width === 'number') {
      width = new Length(width);
    }

    return this._plainHelper(
      width,
      { easing, interpolation },
      (rectangle) => rectangle.width,
      (element) => element.getWidth(),
    );
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
    height: RequestObject<Length | undefined> | Length | undefined | number,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateLength,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Length | undefined>;
    } = {},
  ): RectangleShapeBuilder {
    if (typeof height === 'number') {
      height = new Length(height);
    }

    return this._plainHelper(
      height,
      { easing, interpolation },
      (rectangle) => rectangle.height,
      (element) => element.getHeight(),
    );
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
      | RequestObject<Length | undefined>
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
    if (typeof cornerRadiusX === 'number') {
      cornerRadiusX = new Length(cornerRadiusX);
    }

    return this._plainHelper(
      cornerRadiusX,
      { easing, interpolation },
      (rectangle) => rectangle.rx,
      (element) => element.getRadiusX(),
    );
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
      | RequestObject<Length | undefined>
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
    if (typeof cornerRadiusY === 'number') {
      cornerRadiusY = new Length(cornerRadiusY);
    }

    return this._plainHelper(
      cornerRadiusY,
      { easing, interpolation },
      (rectangle) => rectangle.ry,
      (element) => element.getRadiusY(),
    );
  }
}
