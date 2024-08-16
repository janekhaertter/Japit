import { TransitionMap } from 'lib/animation';
import { Coordinate } from 'lib/data-types';
import { Easing, easeInOutQubic } from 'lib/easing';
import { Interpolation, interpolateCoordinate } from 'lib/interpolation';
import { ReactiveValue, ensureReactive } from 'lib/reactive-values';

import { GeometryElement } from './geometry-element';
import { Line } from './line';
import { Shape } from './shape';

export class LineShapeBuilder {
  private _transitionMap: TransitionMap;

  /**
   * The circles that are already circles and for which we thus only need to transition the individual attributes.
   */
  private _lines: Line[] = [];

  /**
   * The circles that are not circles yet and for which we thus only set the attributes of the target circle.
   */
  private _futureLines: Line[] = [];

  constructor({
    transitionMap,
    elements,
    easing,
    interpolation,
  }: {
    transitionMap: TransitionMap;
    elements: GeometryElement[];
    easing: Easing;
    interpolation: Interpolation<Shape | undefined>;
  }) {
    this._transitionMap = transitionMap;
    elements.forEach((e) => {
      const shape: Shape = e.shape.getValue();

      if (shape instanceof Line) {
        this._lines.push(shape);
      } else {
        const line = new Line();

        this._transitionMap.set(e.shape, {
          to: ensureReactive(line),
          easing,
          interpolation,
        });
        this._futureLines.push(line);
      }
    });
  }

  /**
   * Transitions the x-coordinate of the first endpoint of the lines.
   * @param x1 - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link LineShapeBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/x1
   */
  public x1(
    x1: ReactiveValue<Coordinate | undefined> | Coordinate | undefined | number,
    {
      easing = easeInOutQubic,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): LineShapeBuilder {
    if (typeof x1 === 'number') {
      x1 = new Coordinate(x1);
    }

    x1 = ensureReactive(x1);

    this._lines.forEach((l) => {
      this._transitionMap.set(l.x1, {
        to: x1,
        easing,
        interpolation,
      });
    });

    this._futureLines.forEach((l) => {
      l.x1.wrap(x1);
    });

    return this;
  }

  /**
   * Transitions the x-coordinate of the first endpoint of the lines.
   * @param x2 - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link LineShapeBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/x2
   */
  public x2(
    x2: ReactiveValue<Coordinate | undefined> | Coordinate | undefined | number,
    {
      easing = easeInOutQubic,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): LineShapeBuilder {
    if (typeof x2 === 'number') {
      x2 = new Coordinate(x2);
    }

    x2 = ensureReactive(x2);

    this._lines.forEach((l) => {
      this._transitionMap.set(l.x2, {
        to: x2,
        easing,
        interpolation,
      });
    });

    this._futureLines.forEach((l) => {
      l.x2.wrap(x2);
    });

    return this;
  }

  /**
   * Transitions the x-coordinate of the first endpoint of the lines.
   * @param y1 - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link LineShapeBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/y1
   */
  public y1(
    y1: ReactiveValue<Coordinate | undefined> | Coordinate | undefined | number,
    {
      easing = easeInOutQubic,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): LineShapeBuilder {
    if (typeof y1 === 'number') {
      y1 = new Coordinate(y1);
    }

    y1 = ensureReactive(y1);

    this._lines.forEach((l) => {
      this._transitionMap.set(l.y1, {
        to: y1,
        easing,
        interpolation,
      });
    });

    this._futureLines.forEach((l) => {
      l.y1.wrap(y1);
    });

    return this;
  }

  /**
   * Transitions the x-coordinate of the first endpoint of the lines.
   * @param y2 - The x-coordinate to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current {@link LineShapeBuilder} instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/y2
   */
  public y2(
    y2: ReactiveValue<Coordinate | undefined> | Coordinate | undefined | number,
    {
      easing = easeInOutQubic,
      interpolation = interpolateCoordinate,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Coordinate | undefined>;
    } = {},
  ): LineShapeBuilder {
    if (typeof y2 === 'number') {
      y2 = new Coordinate(y2);
    }

    y2 = ensureReactive(y2);

    this._lines.forEach((l) => {
      this._transitionMap.set(l.y2, {
        to: y2,
        easing,
        interpolation,
      });
    });

    this._futureLines.forEach((l) => {
      l.y2.wrap(y2);
    });

    return this;
  }
}
