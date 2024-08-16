import { WrappedNumber } from './wrapped-number';

export class Delta implements WrappedNumber {
  private _delta: number;

  constructor(delta: number) {
    this._delta = Math.max(0, delta);
  }

  public toString(): string {
    return this._delta.toString();
  }

  public getNumber(): number {
    return this._delta;
  }
}
