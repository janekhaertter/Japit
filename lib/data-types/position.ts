import { Coordinate } from './coordinate';

export class Position {
  private _x: Coordinate;
  private _y: Coordinate;

  constructor(x: Coordinate, y: Coordinate) {
    this._x = x;
    this._y = y;
  }

  public getX(): Coordinate {
    return this._x;
  }

  public getY(): Coordinate {
    return this._y;
  }
}
