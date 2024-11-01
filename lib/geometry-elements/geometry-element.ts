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
  private _topLeftX: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  private _topLeftY: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  private _width: SimpleWrappedReactiveValue<Length | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  private _height: SimpleWrappedReactiveValue<Length | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  private _radiusX: SimpleWrappedReactiveValue<Length | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  private _radiusY: SimpleWrappedReactiveValue<Length | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  private _startX: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  private _startY: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  private _endX: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  private _endY: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  private _control1X: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  private _control1Y: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  private _control2X: SimpleWrappedReactiveValue<Coordinate | undefined> =
    new SimpleWrappedReactiveValue(ensureReactive(undefined));
  private _control2Y: SimpleWrappedReactiveValue<Coordinate | undefined> =
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
      this._topLeftX.wrap(shape.getTopLeftX());
      this._topLeftY.wrap(shape.getTopLeftY());
      this._width.wrap(shape.getWidth());
      this._height.wrap(shape.getHeight());
      this._radiusX.wrap(shape.getRadiusX());
      this._radiusY.wrap(shape.getRadiusY());
      this._startX.wrap(shape.getStartX());
      this._startY.wrap(shape.getStartY());
      this._endX.wrap(shape.getEndX());
      this._endY.wrap(shape.getEndY());
      this._control1X.wrap(shape.getControlX1());
      this._control1Y.wrap(shape.getControlY1());
      this._control2X.wrap(shape.getControlX2());
      this._control2Y.wrap(shape.getControlY2());
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

  public getCenterX(): SimpleWrappedReactiveValue<Coordinate | undefined> {
    return this._centerX;
  }

  public getCenterY(): SimpleWrappedReactiveValue<Coordinate | undefined> {
    return this._centerY;
  }

  public getCenter(): ReactiveValue<Position | undefined> {
    return coordinatesToPosition(this._centerX, this._centerY);
  }

  public getRadius(): SimpleWrappedReactiveValue<Length | undefined> {
    return this._radius;
  }

  public getTopLeftX(): SimpleWrappedReactiveValue<Coordinate | undefined> {
    return this._topLeftX;
  }

  public getTopLeftY(): SimpleWrappedReactiveValue<Coordinate | undefined> {
    return this._topLeftY;
  }

  public getWidth(): SimpleWrappedReactiveValue<Length | undefined> {
    return this._width;
  }

  public getHeight(): SimpleWrappedReactiveValue<Length | undefined> {
    return this._height;
  }

  public getRadiusX(): SimpleWrappedReactiveValue<Length | undefined> {
    return this._radiusX;
  }

  public getRadiusY(): SimpleWrappedReactiveValue<Length | undefined> {
    return this._radiusY;
  }

  public getStartX(): SimpleWrappedReactiveValue<Coordinate | undefined> {
    return this._startX;
  }

  public getStartY(): SimpleWrappedReactiveValue<Coordinate | undefined> {
    return this._startY;
  }

  public getEndX(): SimpleWrappedReactiveValue<Coordinate | undefined> {
    return this._endX;
  }

  public getEndY(): SimpleWrappedReactiveValue<Coordinate | undefined> {
    return this._endY;
  }

  public getControl1X(): SimpleWrappedReactiveValue<Coordinate | undefined> {
    return this._control1X;
  }

  public getControl1Y(): SimpleWrappedReactiveValue<Coordinate | undefined> {
    return this._control1Y;
  }

  public getControl2X(): SimpleWrappedReactiveValue<Coordinate | undefined> {
    return this._control2X;
  }

  public getControl2Y(): SimpleWrappedReactiveValue<Coordinate | undefined> {
    return this._control2Y;
  }
}
