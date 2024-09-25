import {
  AlphaValue,
  Color,
  Coordinate,
  Cursor,
  Delta,
  Length,
  Position,
  StrokeDasharray,
  StrokeLinecap,
  StrokeLinejoin,
  Visibility,
} from 'lib/data-types';
import {
  PrimitiveReactiveValue,
  ReactiveValue,
  SimpleWrappedReactiveValue,
  coordinatesToPosition,
  ensureReactive,
} from 'lib/reactive-values';

import { EmptyShape } from './empty-shape';
import { Shape } from './shape';
import { svgNamespace } from './svg-namespace';

// alignment-baseline, baseline-shift, direction, text-anchor, text-decoration, text-overflow, text-rendering, word-spacing (best to look at spec again): RTL (text)
// fill-rule: path and such
// font-family, font-size, font-size-adjust, font-strech, font-style, font-variatio, font-weight, letter-spacing : path and such

export class GeometryElement {
  protected _domElement: SVGGElement = document.createElementNS(
    svgNamespace,
    'g',
  );

  private _changedStyles: { [key: string]: string | null } = {};
  private _changedAttribute: { [key: string]: string | null } = {};

  public zIndex = new SimpleWrappedReactiveValue(
    new PrimitiveReactiveValue<number>(0),
  );
  public deleted = new SimpleWrappedReactiveValue(
    new PrimitiveReactiveValue(false),
  );

  // https://www.w3.org/TR/SVG2/styling.html#PresentationAttributes
  public fill = new SimpleWrappedReactiveValue(
    new PrimitiveReactiveValue<Color | undefined>(undefined),
  );
  public cursor = new SimpleWrappedReactiveValue(
    new PrimitiveReactiveValue<Cursor | undefined>(undefined),
  );
  public fillOpacity = new SimpleWrappedReactiveValue(
    new PrimitiveReactiveValue<AlphaValue | undefined>(undefined),
  );
  public opacity = new SimpleWrappedReactiveValue(
    new PrimitiveReactiveValue<AlphaValue | undefined>(undefined),
  );
  public stroke = new SimpleWrappedReactiveValue(
    new PrimitiveReactiveValue<Color | undefined>(undefined),
  );
  public strokeOpacity = new SimpleWrappedReactiveValue(
    new PrimitiveReactiveValue<AlphaValue | undefined>(undefined),
  );
  public strokeWidth = new SimpleWrappedReactiveValue(
    new PrimitiveReactiveValue<Length | undefined>(undefined),
  );
  public strokeLinecap = new SimpleWrappedReactiveValue(
    new PrimitiveReactiveValue<StrokeLinecap | undefined>(undefined),
  );
  public strokeLinejoin = new SimpleWrappedReactiveValue(
    new PrimitiveReactiveValue<StrokeLinejoin | undefined>(undefined),
  );
  public strokeMiterlimit = new SimpleWrappedReactiveValue(
    new PrimitiveReactiveValue<Delta | undefined>(undefined),
  );
  public strokeDasharray = new SimpleWrappedReactiveValue(
    new PrimitiveReactiveValue<StrokeDasharray | undefined>(undefined),
  );
  public strokeDashoffset = new SimpleWrappedReactiveValue(
    new PrimitiveReactiveValue<Length | undefined>(undefined),
  );
  public visibility = new SimpleWrappedReactiveValue(
    new PrimitiveReactiveValue<Visibility | undefined>(undefined),
  );
  public shape: SimpleWrappedReactiveValue<Shape> =
    new SimpleWrappedReactiveValue(ensureReactive(new EmptyShape()));

  private _centerX: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  private _centerY: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  private _radius: SimpleWrappedReactiveValue<Length | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));

  constructor() {
    this.setupStyle(this.fill, 'fill');
    this.setupStyle(this.cursor, 'cursor');
    this.setupStyle(this.fillOpacity, 'fill-opacity');
    this.setupStyle(this.opacity, 'opacity');
    this.setupStyle(this.stroke, 'stroke');
    this.setupStyle(this.strokeOpacity, 'stroke-opacity');
    this.setupStyle(this.strokeWidth, 'stroke-width');
    this.setupStyle(this.strokeLinecap, 'stroke-linecap');
    this.setupStyle(this.strokeLinejoin, 'stroke-linejoin');
    this.setupStyle(this.strokeMiterlimit, 'stroke-miterlimit');
    this.setupStyle(this.strokeDasharray, 'stroke-dasharray');
    this.setupStyle(this.strokeDashoffset, 'stroke-dashoffset');
    this.setupStyle(this.visibility, 'visibility');

    this.shape.subscribe((shape) => {
      this._centerX.wrap(shape.getCenterX());
      this._centerY.wrap(shape.getCenterY());
      this._radius.wrap(shape.getRadius());
    });
  }

  protected setupStyle(reactiveValue: ReactiveValue<any>, styleName: string) {
    reactiveValue.subscribe((value) => {
      this._changedStyles[styleName] = value?.toString() ?? null;
    });
  }

  protected setupAttribute(
    reactiveValue: ReactiveValue<any>,
    attributeName: string,
  ) {
    reactiveValue.subscribe((value) => {
      this._changedAttribute[attributeName] = value?.toString() ?? null;
    });
  }

  public get domElement(): SVGGElement {
    return this._domElement;
  }

  public draw(): void {
    Object.assign(this._domElement.style, this._changedStyles);
    this._changedStyles = {};

    for (const [attribute, value] of Object.entries(this._changedAttribute)) {
      if (value === null) {
        this._domElement.removeAttribute(attribute);
      } else {
        this._domElement.setAttribute(attribute, value);
      }
    }

    this._domElement.replaceChildren(this.shape.getValue().getDomElement());
  }

  public getCenterX(): ReactiveValue<Coordinate | undefined> {
    return this._centerX;
  }

  public getCenterY(): ReactiveValue<Coordinate | undefined> {
    return this._centerY;
  }

  public getCenter(): ReactiveValue<Position | undefined> {
    return coordinatesToPosition(this._centerX, this._centerY);
  }

  public getRadius(): ReactiveValue<Length | undefined> {
    return this._radius;
  }
}
