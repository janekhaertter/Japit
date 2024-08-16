import { WrappedNumber } from './wrapped-number';

export class Percentage implements WrappedNumber {
  private _percentage: number;

  constructor(percentage: number) {
    this._percentage = Math.max(0, Math.min(1, percentage));
  }

  public toString(): string {
    return this._percentage.toString() + '%';
  }

  public getNumber(): number {
    return this._percentage;
  }
}
