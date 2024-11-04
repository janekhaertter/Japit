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
import { Easing, easeInOutCubic, easeLinear } from 'lib/easing';
import {
  Circle,
  CircleShapeTransitionBuilder,
  ContainerShape,
  GeometryElement,
  Line,
  LineShapeTransitionBuilder,
  Rectangle,
  RectangleShapeBuilder as RectangleShapeTransitionBuilder,
  Shape,
} from 'lib/geometry-elements';
import { ContainerShapeTransitionBuilder } from 'lib/geometry-elements/container-shape-transition-builder';
import { CubicBezier } from 'lib/geometry-elements/cubic-bezier';
import { CubicBezierShapeTransitionBuilder } from 'lib/geometry-elements/cubic-bezier-shape-builder';
import {
  Interpolation,
  interpolateAlphaValue,
  interpolateColorRGB,
  interpolateDelta,
  interpolateDiscrete,
  interpolateLength,
  interpolateNumber,
  interpolateToShape,
} from 'lib/interpolation';
import {
  PrimitiveReactiveValue,
  SimpleWrappedReactiveValue,
  ensureReactive,
} from 'lib/reactive-values';
import { Context, RequestObject } from 'lib/request-object';

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

  private _plainHelper<T extends Exclude<any, RequestObject<any>>>(
    arg: RequestObject<T> | T,
    {
      easing,
      interpolation,
    }: {
      easing: Easing;
      interpolation: Interpolation<T>;
    },
    valueExtractor: (element: GeometryElement) => SimpleWrappedReactiveValue<T>,
  ): TransitionBuilder {
    const parsed =
      arg instanceof RequestObject
        ? arg.getReactiveValue(this._context)
        : new PrimitiveReactiveValue(arg);

    const progress = easing(this._context.progress);

    this._elements.forEach((element) => {
      this._context.updatedValues.set(
        valueExtractor(element),
        interpolation(valueExtractor(element).unwrap(), parsed, progress),
      );
    });
    return this;
  }

  /**
   * Transitions the z-index of the current selection. Elements with a higher z-index will be drawn on top of elements with a lower z-index.
   * @param zIndex - The z-index to transition to.
   * @param easing - The easing function to use.
   * @param interpolation - The interpolation function to use.
   * @returns The current TransitionBuilder instance.
   */
  public zIndex(
    zIndex: RequestObject<number> | number,
    {
      easing = easeInOutCubic,
      interpolation = interpolateNumber,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<number>;
    } = {},
  ): TransitionBuilder {
    return this._plainHelper(
      zIndex,
      { easing, interpolation },
      (element) => element.zIndex,
    );
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
    fill: RequestObject<Color | undefined> | Color | undefined | string,
    {
      easing = easeInOutCubic,
      interpolation = interpolateColorRGB,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Color | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof fill === 'string') {
      fill = new Color(fill);
    }
    return this._plainHelper(
      fill,
      { easing, interpolation },
      (element) => element.fill,
    );
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
    cursor: RequestObject<Cursor | undefined> | Cursor | undefined,
    {
      easing = easeInOutCubic,
      interpolation = interpolateDiscrete,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Cursor | undefined>;
    } = {},
  ): TransitionBuilder {
    return this._plainHelper(
      cursor,
      { easing, interpolation },
      (element) => element.cursor,
    );
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
      | RequestObject<AlphaValue | undefined>
      | AlphaValue
      | undefined
      | number,
    {
      easing = easeInOutCubic,
      interpolation = interpolateAlphaValue,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<AlphaValue | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof fillOpacity === 'number') {
      fillOpacity = new AlphaValue(fillOpacity);
    }

    return this._plainHelper(
      fillOpacity,
      { easing, interpolation },
      (element) => element.fillOpacity,
    );
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
      | RequestObject<AlphaValue | undefined>
      | AlphaValue
      | undefined
      | number,
    {
      easing = easeInOutCubic,
      interpolation = interpolateAlphaValue,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<AlphaValue | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof opacity === 'number') {
      opacity = new AlphaValue(opacity);
    }

    return this._plainHelper(
      opacity,
      { easing, interpolation },
      (element) => element.opacity,
    );
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
    stroke: RequestObject<Color | undefined> | Color | undefined | string,
    {
      easing = easeInOutCubic,
      interpolation = interpolateColorRGB,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Color | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof stroke === 'string') {
      stroke = new Color(stroke);
    }

    return this._plainHelper(
      stroke,
      { easing, interpolation },
      (element) => element.stroke,
    );
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
      | RequestObject<AlphaValue | undefined>
      | AlphaValue
      | undefined
      | number,
    {
      easing = easeInOutCubic,
      interpolation = interpolateAlphaValue,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<AlphaValue | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof strokeOpacity === 'number') {
      strokeOpacity = new AlphaValue(strokeOpacity);
    }

    return this._plainHelper(
      strokeOpacity,
      { easing, interpolation },
      (element) => element.strokeOpacity,
    );
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
      | RequestObject<Length | undefined>
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
  ): TransitionBuilder {
    if (typeof strokeWidth === 'number') {
      strokeWidth = new Length(strokeWidth);
    }

    return this._plainHelper(
      strokeWidth,
      { easing, interpolation },
      (element) => element.strokeWidth,
    );
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
      | RequestObject<StrokeLinecap | undefined>
      | StrokeLinecap
      | undefined,
    {
      easing = easeInOutCubic,
      interpolation = interpolateDiscrete,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<StrokeLinecap | undefined>;
    } = {},
  ): TransitionBuilder {
    return this._plainHelper(
      strokeLinecap,
      { easing, interpolation },
      (element) => element.strokeLinecap,
    );
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
      | RequestObject<StrokeLinejoin | undefined>
      | StrokeLinejoin
      | undefined,
    {
      easing = easeInOutCubic,
      interpolation = interpolateDiscrete,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<StrokeLinejoin | undefined>;
    } = {},
  ): TransitionBuilder {
    return this._plainHelper(
      strokeLinejoin,
      { easing, interpolation },
      (element) => element.strokeLinejoin,
    );
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
      | RequestObject<Delta | undefined>
      | Delta
      | number
      | undefined,
    {
      easing = easeInOutCubic,
      interpolation = interpolateDelta,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Delta | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof strokeMiterlimit === 'number') {
      strokeMiterlimit = new Delta(strokeMiterlimit);
    }

    return this._plainHelper(
      strokeMiterlimit,
      { easing, interpolation },
      (element) => element.strokeMiterlimit,
    );
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
      | RequestObject<StrokeDasharray | undefined>
      | StrokeDasharray
      | undefined,
    {
      easing = easeInOutCubic,
      interpolation = interpolateDiscrete,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<StrokeDasharray | undefined>;
    } = {},
  ): TransitionBuilder {
    return this._plainHelper(
      strokeDasharray,
      { easing, interpolation },
      (element) => element.strokeDasharray,
    );
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
      | RequestObject<Length | undefined>
      | Length
      | number
      | undefined,
    {
      easing = easeInOutCubic,
      interpolation = interpolateLength,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Length | undefined>;
    } = {},
  ): TransitionBuilder {
    if (typeof strokeDashoffset === 'number') {
      strokeDashoffset = new Length(strokeDashoffset);
    }

    return this._plainHelper(
      strokeDashoffset,
      { easing, interpolation },
      (element) => element.strokeDashoffset,
    );
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
    visibility: RequestObject<Visibility | undefined> | Visibility | undefined,
    {
      easing = easeInOutCubic,
      interpolation = interpolateDiscrete,
    }: {
      easing?: Easing;
      interpolation?: Interpolation<Visibility | undefined>;
    } = {},
  ): TransitionBuilder {
    return this._plainHelper(
      visibility,
      { easing, interpolation },
      (element) => element.visibility,
    );
  }

  public shape(
    shape: RequestObject<Shape | undefined> | Shape | undefined,
    {
      easing = easeInOutCubic,
    }: {
      easing?: Easing;
    } = {},
  ): TransitionBuilder {
    const parsed =
      shape instanceof RequestObject
        ? shape.getReactiveValue(this._context)
        : new PrimitiveReactiveValue(shape);

    const interpolator = interpolateToShape(parsed);
    const progress = easing(this._context.progress);

    this._elements.forEach((e) => {
      this._context.updatedValues.set(
        e.shape,
        interpolator(e.shape.unwrap(), progress),
      );
    });

    return this;
  }

  public circle(
    circleShape?: (
      circleShapeTransitionBuilder: CircleShapeTransitionBuilder,
    ) => void,
    {
      easing = easeInOutCubic,
    }: {
      easing?: Easing;
    } = {},
  ): TransitionBuilder {
    const updatedShapes = new Map<GeometryElement, Circle>();

    const circleShapeBuilder = new CircleShapeTransitionBuilder({
      context: this._context,
      elements: this._elements,
      updatedShapes,
    });

    if (circleShape) {
      circleShape(circleShapeBuilder);
    }

    const progress = easing(this._context.progress);

    updatedShapes.forEach((circle, element) => {
      this._context.updatedValues.set(
        element.shape,
        interpolateToShape(ensureReactive(circle))(
          element.shape.unwrap(),
          progress,
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
    const updatedShapes = new Map<GeometryElement, Rectangle>();

    const rectangleShapeBuilder = new RectangleShapeTransitionBuilder({
      context: this._context,
      elements: this._elements,
      updatedShapes,
    });

    if (rectangleShape) {
      rectangleShape(rectangleShapeBuilder);
    }

    const progress = easing(this._context.progress);

    updatedShapes.forEach((rectangle, element) => {
      this._context.updatedValues.set(
        element.shape,
        interpolateToShape(ensureReactive(rectangle))(
          element.shape.unwrap(),
          progress,
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
    const updatedShapes = new Map<GeometryElement, Line>();

    const lineShapeBuilder = new LineShapeTransitionBuilder({
      context: this._context,
      elements: this._elements,
      updatedShapes,
    });

    if (lineShape) {
      lineShape(lineShapeBuilder);
    }

    const progress = easing(this._context.progress);

    updatedShapes.forEach((line, element) => {
      this._context.updatedValues.set(
        element.shape,
        interpolateToShape(ensureReactive(line))(
          element.shape.unwrap(),
          progress,
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
    const updatedShapes = new Map<GeometryElement, CubicBezier>();

    const cubicBezierShapeBuilder = new CubicBezierShapeTransitionBuilder({
      context: this._context,
      elements: this._elements,
      updatedShapes,
    });

    if (cubicBezierShape) {
      cubicBezierShape(cubicBezierShapeBuilder);
    }

    const progress = easing(this._context.progress);

    updatedShapes.forEach((cubicBezier, element) => {
      this._context.updatedValues.set(
        element.shape,
        interpolateToShape(ensureReactive(cubicBezier))(
          element.shape.unwrap(),
          progress,
        ),
      );
    });

    return this;
  }

  public containerShape(
    containerShape?: (
      containerShapeTransitionBuilder: ContainerShapeTransitionBuilder,
    ) => void,
    {
      easing = easeLinear,
    }: {
      easing?: Easing;
    } = {},
  ): TransitionBuilder {
    const updatedShapes = new Map<GeometryElement, ContainerShape>();

    const containerShapeBuilder = new ContainerShapeTransitionBuilder({
      context: this._context,
      elements: this._elements,
      updatedShapes,
    });

    if (containerShape) {
      containerShape(containerShapeBuilder);
    }

    const progress = easing(this._context.progress);

    updatedShapes.forEach((containerShape, element) => {
      this._context.updatedValues.set(
        element.shape,
        interpolateToShape(ensureReactive(containerShape))(
          element.shape.unwrap(),
          progress,
        ),
      );
    });

    return this;
  }
}
