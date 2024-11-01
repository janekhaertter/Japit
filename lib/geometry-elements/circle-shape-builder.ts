import { Coordinate, Length, Position } from 'lib/data-types';
import { Easing, easeJumpToEnd } from 'lib/easing';
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
      easing = easeJumpToEnd,
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

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      this._updatedShapes
        .get(element)!
        .cx.wrap(
          interpolation(element.getCenterX().unwrap(), centerX, progress),
        );
    });

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
      easing = easeJumpToEnd,
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

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      this._updatedShapes
        .get(element)!
        .cy.wrap(
          interpolation(element.getCenterY().unwrap(), centerY, progress),
        );
    });

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
      easing = easeJumpToEnd,
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
      easing = easeJumpToEnd,
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

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      this._updatedShapes
        .get(element)!
        .r.wrap(interpolation(element.getRadius().unwrap(), radius, progress));
    });

    return this;
  }
}
