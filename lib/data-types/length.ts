import { WrappedNumber } from './wrapped-number';

export class Length implements WrappedNumber {
  private _length: number;

  constructor(length: number) {
    this._length = Math.max(0, length);
  }

  public toString(): string {
    return this._length + 'px';
  }

  public getNumber(): number {
    return this._length;
  }
}
