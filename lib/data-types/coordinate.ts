import { WrappedNumber } from './wrapped-number';

export class Coordinate implements WrappedNumber {
  private _coordinate: number;

  constructor(coordinate: number) {
    this._coordinate = coordinate;
  }

  public getNumber(): number {
    return this._coordinate;
  }

  public toString(): string {
    return this._coordinate.toString() + 'px';
  }
}
