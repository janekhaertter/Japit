import { Coordinate, Length } from 'lib/data-types';
import { Easing, easeJumpToEnd } from 'lib/easing';
import {
  Interpolation,
  interpolateCoordinate,
  interpolateDiscrete,
  interpolateLength,
} from 'lib/interpolation';
import {
  PrimitiveReactiveValue,
  SimpleWrappedReactiveValue,
} from 'lib/reactive-values';
import { Context, RequestObject } from 'lib/request-object';

import { ContainerShape } from './container-shape';
import { GeometryElement } from './geometry-element';

export class ContainerShapeTransitionBuilder {
  private _context: Context;
  private _elements: GeometryElement[];
  private _updatedShapes: Map<GeometryElement, ContainerShape>;

  constructor({
    context,
    elements,
    updatedShapes,
  }: {
    context: Context;
    elements: GeometryElement[];
    updatedShapes: Map<GeometryElement, ContainerShape>;
  }) {
    this._context = context;
    this._elements = elements;
    this._updatedShapes = updatedShapes;

    this._elements.forEach((element) => {
      const x = element.getTopLeftX().unwrap();
      const y = element.getTopLeftY().unwrap();
      const width = element.getWidth().unwrap();
      const height = element.getHeight().unwrap();

      const containerShape = new ContainerShape();

      containerShape.x.wrap(x);
      containerShape.y.wrap(y);
      containerShape.width.wrap(width);
      containerShape.height.wrap(height);

      this._updatedShapes.set(element, containerShape);
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
    valueExtractor: (
      containerShape: ContainerShape,
    ) => SimpleWrappedReactiveValue<T>,
    oldValueExtractor: (
      element: GeometryElement,
    ) => SimpleWrappedReactiveValue<T>,
  ): ContainerShapeTransitionBuilder {
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
   * Transitions the child of the container shape.
   * @param child - The child to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link ContainerShapeTransitionBuilder} instance.
   */
  public child(
    child: RequestObject<SVGElement | undefined> | SVGElement | undefined,
    {
      easing = easeJumpToEnd,
      interpolation = interpolateDiscrete,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<SVGElement | undefined>;
    } = {},
  ): ContainerShapeTransitionBuilder {
    return this._plainHelper(
      child,
      { easing, interpolation },
      (containerShape) => containerShape.child,
      (element) => element.getChild(),
    );
  }

  /**
   * Transitions the x-coordinate of the top-left corner of the container shape.
   * @param x - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link ContainerShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/x
   */
  public topLeftX(
    topLeftX:
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
  ): ContainerShapeTransitionBuilder {
    if (typeof topLeftX === 'number') {
      topLeftX = new Coordinate(topLeftX);
    }

    return this._plainHelper(
      topLeftX,
      { easing, interpolation },
      (containerShape) => containerShape.x,
      (element) => element.getTopLeftX(),
    );
  }

  /**
   * Transitions the y-coordinate of the top-left corner of the container shape.
   * @param y - The y-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link ContainerShapeTransitionBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/x
   */
  public topLeftY(
    topLeftY:
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
  ): ContainerShapeTransitionBuilder {
    if (typeof topLeftY === 'number') {
      topLeftY = new Coordinate(topLeftY);
    }

    return this._plainHelper(
      topLeftY,
      { easing, interpolation },
      (containerShape) => containerShape.y,
      (element) => element.getTopLeftY(),
    );
  }

  /**
   * Transitions the width of the container shape.
   * @param width - The width to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link ContainerShapeTransitionBuilder} instance.
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
  ): ContainerShapeTransitionBuilder {
    if (typeof width === 'number') {
      width = new Length(width);
    }

    return this._plainHelper(
      width,
      { easing, interpolation },
      (containerShape) => containerShape.width,
      (element) => element.getWidth(),
    );
  }

  /**
   * Transitions the height of the container shape.
   * @param height - The height to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link ContainerShapeTransitionBuilder} instance.
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
  ): ContainerShapeTransitionBuilder {
    if (typeof height === 'number') {
      height = new Length(height);
    }

    return this._plainHelper(
      height,
      { easing, interpolation },
      (containerShape) => containerShape.height,
      (element) => element.getHeight(),
    );
  }
}
