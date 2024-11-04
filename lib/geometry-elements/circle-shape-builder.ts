import { Coordinate, Length, Position } from 'lib/data-types';
import { Easing, easeJumpToEnd } from 'lib/easing';
import {
  Interpolation,
  interpolateCoordinate,
  interpolateLength,
} from 'lib/interpolation';
import {
  PrimitiveReactiveValue,
  SimpleWrappedReactiveValue,
  positionToCoordinates,
} from 'lib/reactive-values';
import { Context, RequestObject } from 'lib/request-object';

import { Circle } from './circle';
import { GeometryElement } from './geometry-element';

export class CircleShapeTransitionBuilder {
  private _context: Context;
  private _elements: GeometryElement[];
  private _updatedShapes: Map<GeometryElement, Circle>;

  constructor({
    context,
    elements,
    updatedShapes,
  }: {
    context: Context;
    elements: GeometryElement[];
    updatedShapes: Map<GeometryElement, Circle>;
  }) {
    this._context = context;
    this._elements = elements;
    this._updatedShapes = updatedShapes;

    this._elements.forEach((element) => {
      const cx = element.getCenterX().unwrap();
      const cy = element.getCenterY().unwrap();
      const r = element.getRadius().unwrap();

      const circle = new Circle();
      circle.cx.wrap(cx);
      circle.cy.wrap(cy);
      circle.r.wrap(r);

      this._updatedShapes.set(element, circle);
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
    valueExtractor: (circle: Circle) => SimpleWrappedReactiveValue<T>,
    oldValueExtractor: (
      element: GeometryElement,
    ) => SimpleWrappedReactiveValue<T>,
  ): CircleShapeTransitionBuilder {
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
   * Transitions the x-coordinate of the centers the circles.
   * @param centerX - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current CircleShapeBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/cx
   */
  public centerX(
    centerX:
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
  ): CircleShapeTransitionBuilder {
    if (typeof centerX === 'number') {
      centerX = new Coordinate(centerX);
    }

    return this._plainHelper(
      centerX,
      { easing, interpolation },
      (circle) => circle.cx,
      (element) => element.getCenterX(),
    );
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
  ): CircleShapeTransitionBuilder {
    if (typeof centerY === 'number') {
      centerY = new Coordinate(centerY);
    }

    return this._plainHelper(
      centerY,
      { easing, interpolation },
      (circle) => circle.cy,
      (element) => element.getCenterY(),
    );
  }

  /**
   * Transitions the center of the currently selected circles.
   * @param center - The center position to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current CircleShapeBuilder instance.
   */
  public center(
    center: RequestObject<Position | undefined> | Position | undefined,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): CircleShapeTransitionBuilder {
    const parsed =
      center instanceof RequestObject
        ? center.getReactiveValue(this._context)
        : new PrimitiveReactiveValue(center);

    const { x, y } = positionToCoordinates(parsed);

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
    radius: RequestObject<Length | undefined> | Length | undefined | number,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateLength,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Length | undefined>;
    } = {},
  ): CircleShapeTransitionBuilder {
    if (typeof radius === 'number') {
      radius = new Length(radius);
    }

    return this._plainHelper(
      radius,
      { easing, interpolation },
      (circle) => circle.r,
      (element) => element.getRadius(),
    );
  }
}
