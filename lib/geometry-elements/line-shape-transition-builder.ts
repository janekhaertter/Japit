import { Coordinate, Position } from 'lib/data-types';
import { Easing, easeJumpToEnd } from 'lib/easing';
import {
  Interpolation,
  interpolateCoordinate,
  interpolateOptionalNumber,
} from 'lib/interpolation';
import {
  PrimitiveReactiveValue,
  SimpleWrappedReactiveValue,
  positionToCoordinates,
} from 'lib/reactive-values';
import { Context, RequestObject } from 'lib/request-object';

import { GeometryElement } from './geometry-element';
import { Line } from './line';

export class LineShapeTransitionBuilder {
  private _context: Context;
  private _elements: GeometryElement[];
  private _updatedShapes: Map<GeometryElement, Line>;

  constructor({
    context,
    elements,
    updatedShapes,
  }: {
    context: Context;
    elements: GeometryElement[];
    updatedShapes: Map<GeometryElement, Line>;
  }) {
    this._context = context;
    this._elements = elements;
    this._updatedShapes = updatedShapes;

    this._elements.forEach((element) => {
      const startX = element.getStartX().unwrap();
      const startY = element.getStartY().unwrap();
      const endX = element.getEndX().unwrap();
      const endY = element.getEndY().unwrap();
      const pathLength = element.getPathLength().unwrap();

      const line = new Line();
      line.x1.wrap(startX);
      line.y1.wrap(startY);
      line.x2.wrap(endX);
      line.y2.wrap(endY);
      line.pathLength.wrap(pathLength);

      this._updatedShapes.set(element, line);
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
    valueExtractor: (line: Line) => SimpleWrappedReactiveValue<T>,
    oldValueExtractor: (
      element: GeometryElement,
    ) => SimpleWrappedReactiveValue<T>,
  ): LineShapeTransitionBuilder {
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
   * Transitions the x-coordinate of the starting point of the line.
   * @param startX - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link LineShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/x1
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
  ): LineShapeTransitionBuilder {
    if (typeof startX === 'number') {
      startX = new Coordinate(startX);
    }

    return this._plainHelper(
      startX,
      { easing, interpolation },
      (line) => line.x1,
      (element) => element.getStartX(),
    );
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
  ): LineShapeTransitionBuilder {
    if (typeof startY === 'number') {
      startY = new Coordinate(startY);
    }

    return this._plainHelper(
      startY,
      { easing, interpolation },
      (line) => line.y1,
      (element) => element.getStartY(),
    );
  }

  /**
   * Transitions the starting point of the line.
   * @param start - The starting position to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link LineShapeTransitionBuilder} instance.
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
  ): LineShapeTransitionBuilder {
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
   * Transitions the x-coordinate of the ending point of the line.
   * @param endX - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link LineShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/x2
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
  ): LineShapeTransitionBuilder {
    if (typeof endX === 'number') {
      endX = new Coordinate(endX);
    }

    return this._plainHelper(
      endX,
      { easing, interpolation },
      (line) => line.x2,
      (element) => element.getEndX(),
    );
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
  ): LineShapeTransitionBuilder {
    if (typeof endY === 'number') {
      endY = new Coordinate(endY);
    }

    return this._plainHelper(
      endY,
      { easing, interpolation },
      (line) => line.y2,
      (element) => element.getEndY(),
    );
  }

  /**
   * Transitions the ending point of the line.
   * @param end - The ending position to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link LineShapeTransitionBuilder} instance.
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
  ): LineShapeTransitionBuilder {
    const parsed =
      end instanceof RequestObject
        ? end.getReactiveValue(this._context)
        : new PrimitiveReactiveValue(end);

    const { x, y } = positionToCoordinates(parsed);

    this.endX(x, { easing, interpolation });
    this.endY(y, { easing, interpolation });

    return this;
  }

  /**
   * Transitions the path length of the line.
   * @param pathLength - The path length to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link LineShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/pathLength
   */
  public pathLength(
    pathLength: RequestObject<number | undefined> | number | undefined,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateOptionalNumber,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<number | undefined>;
    } = {},
  ): LineShapeTransitionBuilder {
    return this._plainHelper(
      pathLength,
      { easing, interpolation },
      (line) => line.pathLength,
      (element) => element.getPathLength(),
    );
  }
}
