import { WrappedNumber } from './wrapped-number';

export class AlphaValue implements WrappedNumber {
  private _alpha: number;

  constructor(alpha: number) {
    this._alpha = Math.max(0, Math.min(1, alpha));
  }

  public getNumber(): number {
    return this._alpha;
  }

  public toString(): string {
    return this._alpha.toString();
  }
}
