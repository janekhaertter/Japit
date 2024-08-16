export class PathData {
  private _pathSegments: PathSegment[];

  constructor(pathSegments: PathSegment[]) {
    this._pathSegments = pathSegments;
  }

  public toString(): string {
    return this._pathSegments.map((s) => s.toString()).join(' ');
  }
}

export class CubicBezierCurve {
  public startX: number;
  public startY: number;
  public controll1X: number;
  public controll1Y: number;
  public controll2X: number;
  public controll2Y: number;
  public endX: number;
  public endY: number;

  constructor({
    startX,
    startY,
    controll1X,
    controll1Y,
    controll2X,
    controll2Y,
    endX,
    endY,
  }: {
    startX: number;
    startY: number;
    controll1X: number;
    controll1Y: number;
    controll2X: number;
    controll2Y: number;
    endX: number;
    endY: number;
  }) {
    this.startX = startX;
    this.startY = startY;
    this.controll1X = controll1X;
    this.controll1Y = controll1Y;
    this.controll2X = controll2X;
    this.controll2Y = controll2Y;
    this.endX = endX;
    this.endY = endY;
  }
}

export abstract class PathSegment {
  public abstract toCubicBezierCurve({
    startX,
    startY,
  }: {
    startX: number;
    startY: number;
  }): CubicBezierCurve;
  public abstract toString(): string;
}

export class MoveTo extends PathSegment {
  private _x: number;
  private _y: number;

  constructor({ x, y }: { x: number; y: number }) {
    super();
    this._x = x;
    this._y = y;
  }

  public toString(): string {
    return `M ${this._x} ${this._y}`;
  }

  public toCubicBezierCurve({
    startX,
    startY,
  }: {
    startX: number;
    startY: number;
  }): CubicBezierCurve {
    return new CubicBezierCurve({
      startX,
      startY,
      controll1X: (2 / 3) * startX + (1 / 3) * this._x,
      controll1Y: (2 / 3) * startY + (1 / 3) * this._y,
      controll2X: (1 / 3) * startX + (2 / 3) * this._x,
      controll2Y: (1 / 3) * startY + (2 / 3) * this._y,
      endX: this._x,
      endY: this._y,
    });
  }
}

export class LineTo extends PathSegment {
  private _x: number;
  private _y: number;

  constructor({ x, y }: { x: number; y: number }) {
    super();
    this._x = x;
    this._y = y;
  }

  public toString(): string {
    return `L ${this._x} ${this._y}`;
  }

  public toCubicBezierCurve({
    startX,
    startY,
  }: {
    startX: number;
    startY: number;
  }): CubicBezierCurve {
    return new CubicBezierCurve({
      startX,
      startY,
      controll1X: (2 / 3) * startX + (1 / 3) * this._x,
      controll1Y: (2 / 3) * startY + (1 / 3) * this._y,
      controll2X: (1 / 3) * startX + (2 / 3) * this._x,
      controll2Y: (1 / 3) * startY + (2 / 3) * this._y,
      endX: this._x,
      endY: this._y,
    });
  }
}

export class CubicBezierCurveTo extends PathSegment {
  private _controll1X: number;
  private _controll1Y: number;
  private _controll2X: number;
  private _controll2Y: number;
  private _x: number;
  private _y: number;

  constructor({
    controll1X,
    controll1Y,
    controll2X,
    controll2Y,
    x,
    y,
  }: {
    controll1X: number;
    controll1Y: number;
    controll2X: number;
    controll2Y: number;
    x: number;
    y: number;
  }) {
    super();
    this._controll1X = controll1X;
    this._controll1Y = controll1Y;
    this._controll2X = controll2X;
    this._controll2Y = controll2Y;
    this._x = x;
    this._y = y;
  }

  public toString(): string {
    return `C ${this._controll1X} ${this._controll1Y} ${this._controll2X} ${this._controll2Y} ${this._x} ${this._y}`;
  }

  public toCubicBezierCurve({
    startX,
    startY,
  }: {
    startX: number;
    startY: number;
  }): CubicBezierCurve {
    return new CubicBezierCurve({
      startX,
      startY,
      controll1X: this._controll1X,
      controll1Y: this._controll1Y,
      controll2X: this._controll2X,
      controll2Y: this._controll2Y,
      endX: this._x,
      endY: this._y,
    });
  }
}

export class QuadraticBezierCurve extends PathSegment {
  private _controllX: number;
  private _controllY: number;
  private _x: number;
  private _y: number;

  constructor({
    controllX,
    controllY,
    x,
    y,
  }: {
    controllX: number;
    controllY: number;
    x: number;
    y: number;
  }) {
    super();
    this._controllX = controllX;
    this._controllY = controllY;
    this._x = x;
    this._y = y;
  }

  public toString(): string {
    return `Q ${this._controllX} ${this._controllY} ${this._x} ${this._y}`;
  }

  public toCubicBezierCurve({
    startX,
    startY,
  }: {
    startX: number;
    startY: number;
  }): CubicBezierCurve {
    return new CubicBezierCurve({
      startX,
      startY,
      controll1X: startX + (2 / 3) * (this._controllX - startX),
      controll1Y: startY + (2 / 3) * (this._controllY - startY),
      controll2X: this._x + (2 / 3) * (this._controllX - this._x),
      controll2Y: this._y + (2 / 3) * (this._controllY - this._y),
      endX: this._x,
      endY: this._y,
    });
  }
}
