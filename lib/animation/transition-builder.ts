import {
  AlphaValue,
  Color,
  Cursor,
  Delta,
  Length,
  StrokeDasharray,
  StrokeLinecap,
  StrokeLinejoin,
  Visibility,
} from 'lib/data-types';
import { Easing, easeInOutQubic, easeLinear } from 'lib/easing';
import {
  CircleShapeTransitionBuilder,
  EmptyShape,
  GeometryElement,
  LineShapeTransitionBuilder,
  RectangleShapeBuilder as RectangleShapeTransitionBuilder,
} from 'lib/geometry-elements';
import { CubicBezierShapeTransitionBuilder } from 'lib/geometry-elements/cubic-bezier-shape-builder';
import {
  Interpolation,
  interpolateAlphaValue,
  interpolateColorRGB,
  interpolateDelta,
  interpolateDiscrete,
  interpolateLength,
  interpolateNumber,
  interpolateToCircle,
  interpolateToCubicBezier,
  interpolateToLine,
  interpolateToRectangle,
} from 'lib/interpolation';
import { ReactiveValue, ensureReactive } from 'lib/reactive-values';
import { Context, RequestFunction } from 'lib/request-functions';

export class TransitionBuilder {
  private _elements: GeometryElement[];
  private _context: Context;

  constructor({
    elements,
    context,
  }: {
    elements: GeometryElement[];
    context: Context;
  }) {
    this._elements = elements;
    this._context = context;
  }

  /**
   * Transitions the z-index of the current selection. Elements with a higher z-index will be drawn on top of elements with a lower z-index.
   * @param zIndex - The z-index to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current TransitionBuilder instance.
   */
  public zIndex(
    zIndex: RequestFunction<number> | ReactiveValue<number> | number,
    {
      easing = easeInOutQubic,
      interpolation = interpolateNumber,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<number>;
    } = {},
  ): TransitionBuilder {
    zIndex =
      typeof zIndex === 'function'
        ? zIndex(this._context)
        : ensureReactive(zIndex);

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.zIndex,
        interpolation(
          e.zIndex.unwrap(),
          zIndex,
          easing(this._context.progress),
        ),
      );
    });

    return this;
  }

  /**
   * Transitions the fill color of the current selection.
   * @param fill - The fill color to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current TransitionBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill
   */
  public fill(
    fill:
      | RequestFunction<Color | undefined>
      | ReactiveValue<Color | undefined>
      | Color
      | undefined
      | string,
    {
      easing = easeInOutQubic,
      interpolation = interpolateColorRGB,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Color | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof fill === 'function') {
      fill = fill(this._context);
    } else if (typeof fill === 'string') {
      fill = new Color(fill);
    }

    fill = ensureReactive(fill);

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.fill,
        interpolation(e.fill.unwrap(), fill, easing(this._context.progress)),
      );
    });

    return this;
  }

  /**
   * Transitions the cursor of the current selection.
   * @param cursor - The cursor to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current TransitionBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
   */
  public cursor(
    cursor:
      | RequestFunction<Cursor | undefined>
      | ReactiveValue<Cursor | undefined>
      | Cursor
      | undefined,
    {
      easing = easeInOutQubic,
      interpolation = interpolateDiscrete,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Cursor | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof cursor === 'function') {
      cursor = cursor(this._context);
    }

    cursor = ensureReactive(cursor);

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.cursor,
        interpolation(
          e.cursor.unwrap(),
          cursor,
          easing(this._context.progress),
        ),
      );
    });

    return this;
  }

  /**
   * Transitions the fill opacity of the current selection.
   * @param fillOpacity - The fill opacity to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current TransitionBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-opacity
   */
  public fillOpacity(
    fillOpacity:
      | RequestFunction<AlphaValue | undefined>
      | ReactiveValue<AlphaValue | undefined>
      | AlphaValue
      | undefined
      | number,
    {
      easing = easeInOutQubic,
      interpolation = interpolateAlphaValue,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<AlphaValue | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof fillOpacity === 'function') {
      fillOpacity = fillOpacity(this._context);
    } else if (typeof fillOpacity === 'number') {
      fillOpacity = new AlphaValue(fillOpacity);
    }

    fillOpacity = ensureReactive(fillOpacity);

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.fillOpacity,
        interpolation(
          e.fillOpacity.unwrap(),
          fillOpacity,
          easing(this._context.progress),
        ),
      );
    });

    return this;
  }

  /**
   * Transitions the opacity of the current selection.
   * @param opacity - The opacity to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current TransitionBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/opacity
   */
  public opacity(
    opacity:
      | RequestFunction<AlphaValue | undefined>
      | ReactiveValue<AlphaValue | undefined>
      | AlphaValue
      | undefined
      | number,
    {
      easing = easeInOutQubic,
      interpolation = interpolateAlphaValue,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<AlphaValue | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof opacity === 'function') {
      opacity = opacity(this._context);
    } else if (typeof opacity === 'number') {
      opacity = new AlphaValue(opacity);
    }

    opacity = ensureReactive(opacity);

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.opacity,
        interpolation(
          e.opacity.unwrap(),
          opacity,
          easing(this._context.progress),
        ),
      );
    });

    return this;
  }

  /**
   * Transitions the stroke color of the current selection.
   * @param stroke - The stroke color to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current TransitionBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke
   */
  public stroke(
    stroke:
      | RequestFunction<Color | undefined>
      | ReactiveValue<Color | undefined>
      | Color
      | undefined
      | string,
    {
      easing = easeInOutQubic,
      interpolation = interpolateColorRGB,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Color | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof stroke === 'function') {
      stroke = stroke(this._context);
    } else if (typeof stroke === 'string') {
      stroke = new Color(stroke);
    }

    stroke = ensureReactive(stroke);

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.stroke,
        interpolation(
          e.stroke.unwrap(),
          stroke,
          easing(this._context.progress),
        ),
      );
    });

    return this;
  }

  /**
   * Transitions the stroke opacity of the current selection.
   * @param strokeOpacity - The stroke opacity to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current TransitionBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-opacity
   */
  public strokeOpacity(
    strokeOpacity:
      | RequestFunction<AlphaValue | undefined>
      | ReactiveValue<AlphaValue | undefined>
      | AlphaValue
      | undefined
      | number,
    {
      easing = easeInOutQubic,
      interpolation = interpolateAlphaValue,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<AlphaValue | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof strokeOpacity === 'function') {
      strokeOpacity = strokeOpacity(this._context);
    } else if (typeof strokeOpacity === 'number') {
      strokeOpacity = new AlphaValue(strokeOpacity);
    }

    strokeOpacity = ensureReactive(strokeOpacity);

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.strokeOpacity,
        interpolation(
          e.strokeOpacity.unwrap(),
          strokeOpacity,
          easing(this._context.progress),
        ),
      );
    });

    return this;
  }

  /**
   * Transitions the stroke width of the current selection.
   * @param strokeWidth - The stroke width to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current TransitionBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width
   */
  public strokeWidth(
    strokeWidth:
      | RequestFunction<Length | undefined>
      | ReactiveValue<Length | undefined>
      | Length
      | undefined
      | number,
    {
      easing = easeInOutQubic,
      interpolation = interpolateLength,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Length | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof strokeWidth === 'function') {
      strokeWidth = strokeWidth(this._context);
    } else if (typeof strokeWidth === 'number') {
      strokeWidth = new Length(strokeWidth);
    }

    strokeWidth = ensureReactive(strokeWidth);

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.strokeWidth,
        interpolation(
          e.strokeWidth.unwrap(),
          strokeWidth,
          easing(this._context.progress),
        ),
      );
    });

    return this;
  }

  /**
   * Transitions the stroke linecap of the current selection.
   * @param strokeLinecap - The stroke linecap to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current TransitionBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap
   */
  public strokeLinecap(
    strokeLinecap:
      | RequestFunction<StrokeLinecap | undefined>
      | ReactiveValue<StrokeLinecap | undefined>
      | StrokeLinecap
      | undefined,
    {
      easing = easeInOutQubic,
      interpolation = interpolateDiscrete,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<StrokeLinecap | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof strokeLinecap === 'function') {
      strokeLinecap = strokeLinecap(this._context);
    }

    strokeLinecap = ensureReactive(strokeLinecap);

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.strokeLinecap,
        interpolation(
          e.strokeLinecap.unwrap(),
          strokeLinecap,
          easing(this._context.progress),
        ),
      );
    });

    return this;
  }

  /**
   * Transitions the stroke linejoin of the current selection.
   * @param strokeLinejoin - The stroke linejoin to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current TransitionBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin
   */
  public strokeLinejoin(
    strokeLinejoin:
      | RequestFunction<StrokeLinejoin | undefined>
      | ReactiveValue<StrokeLinejoin | undefined>
      | StrokeLinejoin
      | undefined,
    {
      easing = easeInOutQubic,
      interpolation = interpolateDiscrete,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<StrokeLinejoin | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof strokeLinejoin === 'function') {
      strokeLinejoin = strokeLinejoin(this._context);
    }

    strokeLinejoin = ensureReactive(strokeLinejoin);

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.strokeLinejoin,
        interpolation(
          e.strokeLinejoin.unwrap(),
          strokeLinejoin,
          easing(this._context.progress),
        ),
      );
    });

    return this;
  }

  /**
   * Transitions the stroke miterlimit of the current selection.
   * @param strokeMiterlimit - The stroke miterlimit to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current TransitionBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-miterlimit
   */
  public strokeMiterlimit(
    strokeMiterlimit:
      | RequestFunction<Delta | undefined>
      | ReactiveValue<Delta | undefined>
      | Delta
      | number
      | undefined,
    {
      easing = easeInOutQubic,
      interpolation = interpolateDelta,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Delta | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof strokeMiterlimit === 'function') {
      strokeMiterlimit = strokeMiterlimit(this._context);
    } else if (typeof strokeMiterlimit === 'number') {
      strokeMiterlimit = new Delta(strokeMiterlimit);
    }

    strokeMiterlimit = ensureReactive(strokeMiterlimit);

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.strokeMiterlimit,
        interpolation(
          e.strokeMiterlimit.unwrap(),
          strokeMiterlimit,
          easing(this._context.progress),
        ),
      );
    });

    return this;
  }

  /**
   * Transitions the stroke dasharray of the current selection.
   * @param strokeDasharray - The stroke dasharray to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current TransitionBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray
   */
  public strokeDasharray(
    strokeDasharray:
      | RequestFunction<StrokeDasharray | undefined>
      | ReactiveValue<StrokeDasharray | undefined>
      | StrokeDasharray
      | undefined,
    {
      easing = easeInOutQubic,
      interpolation = interpolateDiscrete,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<StrokeDasharray | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof strokeDasharray === 'function') {
      strokeDasharray = strokeDasharray(this._context);
    }

    strokeDasharray = ensureReactive(strokeDasharray);

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.strokeDasharray,
        interpolation(
          e.strokeDasharray.unwrap(),
          strokeDasharray,
          easing(this._context.progress),
        ),
      );
    });

    return this;
  }

  /**
   * Transitions the stroke dashoffset of the current selection.
   * @param strokeDashoffset - The stroke dashoffset to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current TransitionBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset
   */
  public strokeDashoffset(
    strokeDashoffset:
      | RequestFunction<Length | undefined>
      | ReactiveValue<Length | undefined>
      | Length
      | number
      | undefined,
    {
      easing = easeInOutQubic,
      interpolation = interpolateLength,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Length | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof strokeDashoffset === 'function') {
      strokeDashoffset = strokeDashoffset(this._context);
    } else if (typeof strokeDashoffset === 'number') {
      strokeDashoffset = new Length(strokeDashoffset);
    }

    strokeDashoffset = ensureReactive(strokeDashoffset);

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.strokeDashoffset,
        interpolation(
          e.strokeDashoffset.unwrap(),
          strokeDashoffset,
          easing(this._context.progress),
        ),
      );
    });

    return this;
  }

  /**
   * Transitions the stroke width of the current selection.
   * @param visibility - The visibility to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current TransitionBuilder instance.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/visibility
   */
  public visibility(
    visibility:
      | RequestFunction<Visibility | undefined>
      | ReactiveValue<Visibility | undefined>
      | Visibility
      | undefined,
    {
      easing = easeInOutQubic,
      interpolation = interpolateDiscrete,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Visibility | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof visibility === 'function') {
      visibility = visibility(this._context);
    }

    visibility = ensureReactive(visibility);

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.visibility,
        interpolation(
          e.visibility.unwrap(),
          visibility,
          easing(this._context.progress),
        ),
      );
    });

    return this;
  }

  public circle(
    circleShape?: (
      circleShapeTransitionBuilder: CircleShapeTransitionBuilder,
    ) => void,
    {
      easing = easeLinear,
    }: {
      easing?: Easing;
    } = {},
  ): TransitionBuilder {
    const circleShapeBuilder = new CircleShapeTransitionBuilder({
      context: this._context,
    });

    if (circleShape) {
      circleShape(circleShapeBuilder);
    }

    const shape = circleShapeBuilder.build();

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.shape,
        interpolateToCircle(shape)(
          e.shape.unwrap(),
          ensureReactive(new EmptyShape()),
          easing(this._context.progress),
        ),
      );
    });

    return this;
  }

  public rectangle(
    rectangleShape?: (
      rectangleShapeTransitionBuilder: RectangleShapeTransitionBuilder,
    ) => void,
    {
      easing = easeLinear,
    }: {
      easing?: Easing;
    } = {},
  ): TransitionBuilder {
    const rectangleShapeBuilder = new RectangleShapeTransitionBuilder();

    if (rectangleShape) {
      rectangleShape(rectangleShapeBuilder);
    }

    const shape = rectangleShapeBuilder.build();

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.shape,
        interpolateToRectangle(shape)(
          e.shape.unwrap(),
          ensureReactive(new EmptyShape()),
          easing(this._context.progress),
        ),
      );
    });

    return this;
  }

  public line(
    lineShape?: (
      lineShapeTransitionBuilder: LineShapeTransitionBuilder,
    ) => void,
    {
      easing = easeLinear,
    }: {
      easing?: Easing;
    } = {},
  ): TransitionBuilder {
    const lineShapeBuilder = new LineShapeTransitionBuilder({
      context: this._context,
    });

    if (lineShape) {
      lineShape(lineShapeBuilder);
    }

    const shape = lineShapeBuilder.build();

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.shape,
        interpolateToLine(shape)(
          e.shape.unwrap(),
          ensureReactive(new EmptyShape()),
          easing(this._context.progress),
        ),
      );
    });

    return this;
  }

  public cubicBezier(
    cubicBezierShape?: (
      cubicBezierShapeTransitionBuilder: CubicBezierShapeTransitionBuilder,
    ) => void,
    {
      easing = easeLinear,
    }: {
      easing?: Easing;
    } = {},
  ): TransitionBuilder {
    const cubicBezierShapeBuilder = new CubicBezierShapeTransitionBuilder({
      context: this._context,
    });

    if (cubicBezierShape) {
      cubicBezierShape(cubicBezierShapeBuilder);
    }

    const shape = cubicBezierShapeBuilder.build();

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.shape,
        interpolateToCubicBezier(shape)(
          e.shape.unwrap(),
          ensureReactive(new EmptyShape()),
          easing(this._context.progress),
        ),
      );
    });

    return this;
  }
}
