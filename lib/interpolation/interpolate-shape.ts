import {
  Circle,
  CircleShapeTransition,
  EmptyShape,
  Line,
  LineShapeTransition,
  Rectangle,
  RectangleShapeTransition,
  Shape,
} from 'lib/geometry-elements';
import { CubicBezier } from 'lib/geometry-elements/cubic-bezier';
import { CubicBezierShapeTransition } from 'lib/geometry-elements/cubic-bezier-shape-builder';
import { FunctionalReactiveValue } from 'lib/reactive-values';

import { Interpolation } from './interpolation';

export function interpolateToLine(
  lineShapeTransition: LineShapeTransition,
): Interpolation<Shape> {
  const targetLine = new Line();

  if (lineShapeTransition.startX !== undefined) {
    targetLine.x1.wrap(lineShapeTransition.startX.to);
  }
  if (lineShapeTransition.startY !== undefined) {
    targetLine.y1.wrap(lineShapeTransition.startY.to);
  }
  if (lineShapeTransition.endX !== undefined) {
    targetLine.x2.wrap(lineShapeTransition.endX.to);
  }
  if (lineShapeTransition.endY !== undefined) {
    targetLine.y2.wrap(lineShapeTransition.endY.to);
  }

  return (from, _, progress) => {
    return new FunctionalReactiveValue([from, progress], (_) => {
      const fromValue = from.getValue();
      const progressValue = progress.getValue().getNumber();

      if (progressValue === 0) return fromValue;

      if (fromValue === undefined) return targetLine;

      if (!(fromValue instanceof Line)) return targetLine;

      const res = new Line();

      if (lineShapeTransition.startX !== undefined) {
        const { to, easing, interpolation } = lineShapeTransition.startX;
        res.x1.wrap(interpolation(fromValue.x1, to, easing(progress)));
      }

      if (lineShapeTransition.startY !== undefined) {
        const { to, easing, interpolation } = lineShapeTransition.startY;
        res.y1.wrap(interpolation(fromValue.y1, to, easing(progress)));
      }

      if (lineShapeTransition.endX !== undefined) {
        const { to, easing, interpolation } = lineShapeTransition.endX;
        res.x2.wrap(interpolation(fromValue.x2, to, easing(progress)));
      }

      if (lineShapeTransition.endY !== undefined) {
        const { to, easing, interpolation } = lineShapeTransition.endY;
        res.y2.wrap(interpolation(fromValue.y2, to, easing(progress)));
      }

      return res;
    });
  };
}

export function interpolateToCubicBezier(
  cubicBezierShapeTransition: CubicBezierShapeTransition,
): Interpolation<Shape> {
  const targetCubicBezier = new CubicBezier();

  if (cubicBezierShapeTransition.startX !== undefined) {
    targetCubicBezier.startX.wrap(cubicBezierShapeTransition.startX.to);
  }
  if (cubicBezierShapeTransition.startY !== undefined) {
    targetCubicBezier.startY.wrap(cubicBezierShapeTransition.startY.to);
  }
  if (cubicBezierShapeTransition.control1X !== undefined) {
    targetCubicBezier.control1X.wrap(cubicBezierShapeTransition.control1X.to);
  }
  if (cubicBezierShapeTransition.control1Y !== undefined) {
    targetCubicBezier.control1Y.wrap(cubicBezierShapeTransition.control1Y.to);
  }
  if (cubicBezierShapeTransition.control2X !== undefined) {
    targetCubicBezier.control2X.wrap(cubicBezierShapeTransition.control2X.to);
  }
  if (cubicBezierShapeTransition.control2Y !== undefined) {
    targetCubicBezier.control2Y.wrap(cubicBezierShapeTransition.control2Y.to);
  }
  if (cubicBezierShapeTransition.endX !== undefined) {
    targetCubicBezier.endX.wrap(cubicBezierShapeTransition.endX.to);
  }
  if (cubicBezierShapeTransition.endY !== undefined) {
    targetCubicBezier.endY.wrap(cubicBezierShapeTransition.endY.to);
  }

  return (from, _, progress) => {
    return new FunctionalReactiveValue([from, progress], (_) => {
      const fromValue = from.getValue();
      const progressValue = progress.getValue().getNumber();

      if (progressValue === 0) return fromValue;

      if (fromValue === undefined) return new EmptyShape();

      if (!(fromValue instanceof CubicBezier)) return targetCubicBezier;

      const res = new CubicBezier();

      if (cubicBezierShapeTransition.startX !== undefined) {
        const { to, easing, interpolation } = cubicBezierShapeTransition.startX;
        res.startX.wrap(interpolation(fromValue.startX, to, easing(progress)));
      }

      if (cubicBezierShapeTransition.startY !== undefined) {
        const { to, easing, interpolation } = cubicBezierShapeTransition.startY;
        res.startY.wrap(interpolation(fromValue.startY, to, easing(progress)));
      }

      if (cubicBezierShapeTransition.control1X !== undefined) {
        const { to, easing, interpolation } =
          cubicBezierShapeTransition.control1X;
        res.control1X.wrap(
          interpolation(fromValue.control1X, to, easing(progress)),
        );
      }

      if (cubicBezierShapeTransition.control1Y !== undefined) {
        const { to, easing, interpolation } =
          cubicBezierShapeTransition.control1Y;
        res.control1Y.wrap(
          interpolation(fromValue.control1Y, to, easing(progress)),
        );
      }

      if (cubicBezierShapeTransition.control2X !== undefined) {
        const { to, easing, interpolation } =
          cubicBezierShapeTransition.control2X;
        res.control2X.wrap(
          interpolation(fromValue.control2X, to, easing(progress)),
        );
      }

      if (cubicBezierShapeTransition.control2Y !== undefined) {
        const { to, easing, interpolation } =
          cubicBezierShapeTransition.control2Y;
        res.control2Y.wrap(
          interpolation(fromValue.control2Y, to, easing(progress)),
        );
      }

      if (cubicBezierShapeTransition.endX !== undefined) {
        const { to, easing, interpolation } = cubicBezierShapeTransition.endX;
        res.endX.wrap(interpolation(fromValue.endX, to, easing(progress)));
      }

      if (cubicBezierShapeTransition.endY !== undefined) {
        const { to, easing, interpolation } = cubicBezierShapeTransition.endY;
        res.endY.wrap(interpolation(fromValue.endY, to, easing(progress)));
      }

      return res;
    });
  };
}

export function interpolateToCircle(
  circleShapeTransition: CircleShapeTransition,
): Interpolation<Shape> {
  const targetCircle = new Circle();

  if (circleShapeTransition.centerX !== undefined) {
    targetCircle.cx.wrap(circleShapeTransition.centerX.to);
  }
  if (circleShapeTransition.centerY !== undefined) {
    targetCircle.cy.wrap(circleShapeTransition.centerY.to);
  }
  if (circleShapeTransition.radius !== undefined) {
    targetCircle.r.wrap(circleShapeTransition.radius.to);
  }

  return (from, _, progress) => {
    return new FunctionalReactiveValue([from, progress], (_) => {
      const fromValue = from.getValue();
      const progressValue = progress.getValue().getNumber();

      if (progressValue === 0) return fromValue;

      if (fromValue === undefined) return targetCircle;

      if (!(fromValue instanceof Circle)) return targetCircle;

      const res = new Circle();

      if (circleShapeTransition.centerX !== undefined) {
        const { to, easing, interpolation } = circleShapeTransition.centerX;
        res.cx.wrap(interpolation(fromValue.cx, to, easing(progress)));
      }

      if (circleShapeTransition.centerY !== undefined) {
        const { to, easing, interpolation } = circleShapeTransition.centerY;
        res.cy.wrap(interpolation(fromValue.cy, to, easing(progress)));
      }

      if (circleShapeTransition.radius !== undefined) {
        const { to, easing, interpolation } = circleShapeTransition.radius;
        res.r.wrap(interpolation(fromValue.r, to, easing(progress)));
      }

      return res;
    });
  };
}

export function interpolateToRectangle(
  rectangleShapeTransition: RectangleShapeTransition,
): Interpolation<Shape> {
  const targetRectangle = new Rectangle();

  if (rectangleShapeTransition.x !== undefined) {
    targetRectangle.x.wrap(rectangleShapeTransition.x.to);
  }
  if (rectangleShapeTransition.y !== undefined) {
    targetRectangle.y.wrap(rectangleShapeTransition.y.to);
  }
  if (rectangleShapeTransition.width !== undefined) {
    targetRectangle.width.wrap(rectangleShapeTransition.width.to);
  }
  if (rectangleShapeTransition.height !== undefined) {
    targetRectangle.height.wrap(rectangleShapeTransition.height.to);
  }
  if (rectangleShapeTransition.cornerRadiusX !== undefined) {
    targetRectangle.rx.wrap(rectangleShapeTransition.cornerRadiusX.to);
  }
  if (rectangleShapeTransition.cornerRadiusY !== undefined) {
    targetRectangle.ry.wrap(rectangleShapeTransition.cornerRadiusY.to);
  }

  return (from, _, progress) => {
    return new FunctionalReactiveValue([from, progress], (_) => {
      const fromValue = from.getValue();
      const progressValue = progress.getValue().getNumber();

      if (progressValue === 0) return fromValue;

      if (fromValue === undefined) return targetRectangle;

      if (!(fromValue instanceof Rectangle)) return targetRectangle;

      const res = new Rectangle();

      if (rectangleShapeTransition.x !== undefined) {
        const { to, easing, interpolation } = rectangleShapeTransition.x;
        res.x.wrap(interpolation(fromValue.x, to, easing(progress)));
      }

      if (rectangleShapeTransition.y !== undefined) {
        const { to, easing, interpolation } = rectangleShapeTransition.y;
        res.y.wrap(interpolation(fromValue.y, to, easing(progress)));
      }

      if (rectangleShapeTransition.width !== undefined) {
        const { to, easing, interpolation } = rectangleShapeTransition.width;
        res.width.wrap(interpolation(fromValue.width, to, easing(progress)));
      }

      if (rectangleShapeTransition.height !== undefined) {
        const { to, easing, interpolation } = rectangleShapeTransition.height;
        res.height.wrap(interpolation(fromValue.height, to, easing(progress)));
      }

      if (rectangleShapeTransition.cornerRadiusX !== undefined) {
        const { to, easing, interpolation } =
          rectangleShapeTransition.cornerRadiusX;
        res.rx.wrap(interpolation(fromValue.rx, to, easing(progress)));
      }

      if (rectangleShapeTransition.cornerRadiusY !== undefined) {
        const { to, easing, interpolation } =
          rectangleShapeTransition.cornerRadiusY;
        res.ry.wrap(interpolation(fromValue.ry, to, easing(progress)));
      }

      return res;
    });
  };
}
//
//export function interpolateShape(
//  from: ReactiveValue<Shape | undefined>,
//  to: ReactiveValue<Shape | undefined>,
//  progress: ReactiveValue<AlphaValue>,
//): ReactiveValue<Shape | undefined> {
//  return new FunctionalReactiveValue(
//    [from, to, progress] as [
//      ReactiveValue<Shape | undefined>,
//      ReactiveValue<Shape | undefined>,
//      ReactiveValue<AlphaValue>,
//    ],
//    ([from, to, progress]) => {
//      let fromValue = from.getValue();
//      let toValue = to.getValue();
//      let progressValue = progress.getValue().getNumber();
//
//      if (progressValue === 0) return fromValue;
//      if (fromValue === undefined || toValue === undefined) return toValue;
//
//      if (fromValue.constructor === toValue.constructor) return fromValue;
//
//      //// RECTANGLE => CIRCLE
//      //if (fromValue instanceof Rectangle && toValue instanceof Circle) {
//      //  // just swap values around and reuse code below
//      //  progressValue = 1 - progressValue;
//      //  [fromValue, toValue] = [toValue, fromValue];
//      //}
//      //// CIRCLE => RECTANGLE
//      //if (fromValue instanceof Circle && toValue instanceof Rectangle) {
//      //  const rectangle = new Rectangle();
//
//      //  const circleX =
//      //    (fromValue.cx.getValue()?.getNumber() ?? 0) -
//      //    (fromValue.r.getValue()?.getNumber() ?? 0);
//      //  const rectX = toValue.x.getValue()?.getNumber() ?? 0;
//      //  rectangle.x.wrap(
//      //    ensureReactive(
//      //      new Coordinate(
//      //        (1 - progressValue) * circleX + progressValue * rectX,
//      //      ),
//      //    ),
//      //  );
//
//      //  const circleY =
//      //    (fromValue.cy.getValue()?.getNumber() ?? 0) -
//      //    (fromValue.r.getValue()?.getNumber() ?? 0);
//      //  const rectY = toValue.y.getValue()?.getNumber() ?? 0;
//      //  rectangle.y.wrap(
//      //    ensureReactive(
//      //      new Coordinate(
//      //        (1 - progressValue) * circleY + progressValue * rectY,
//      //      ),
//      //    ),
//      //  );
//
//      //  const circleWidth = (fromValue.r.getValue()?.getNumber() ?? 0) * 2;
//      //  const rectWidth = toValue.width.getValue()?.getNumber() ?? 0;
//      //  rectangle.width.wrap(
//      //    ensureReactive(
//      //      new Length(
//      //        (1 - progressValue) * circleWidth + progressValue * rectWidth,
//      //      ),
//      //    ),
//      //  );
//
//      //  const circleHeight = circleWidth;
//      //  const rectHeight = toValue.height.getValue()?.getNumber() ?? 0;
//      //  rectangle.height.wrap(
//      //    ensureReactive(
//      //      new Length(
//      //        (1 - progressValue) * circleHeight + progressValue * rectHeight,
//      //      ),
//      //    ),
//      //  );
//
//      //  const circleRx = fromValue.r.getValue()?.getNumber() ?? 0;
//      //  const rectRx = toValue.rx.getValue()?.getNumber() ?? 0;
//      //  rectangle.rx.wrap(
//      //    ensureReactive(
//      //      new Length((1 - progressValue) * circleRx + progressValue * rectRx),
//      //    ),
//      //  );
//
//      //  const circleRy = circleRx;
//      //  const rectRy = toValue.ry.getValue()?.getNumber() ?? 0;
//      //  rectangle.ry.wrap(
//      //    ensureReactive(
//      //      new Length((1 - progressValue) * circleRy + progressValue * rectRy),
//      //    ),
//      //  );
//
//      //  return rectangle;
//      //}
//
//      return toValue;
//    },
//  );
//}
