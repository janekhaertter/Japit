import {
  AlphaValue,
  Coordinate,
  Delta,
  Length,
  Percentage,
  WrappedNumber,
} from 'lib/data-types';
import {
  FunctionalReactiveValue,
  PrimitiveReactiveValue,
  ReactiveValue,
} from 'lib/reactive-values';

import { Context } from './context';
import { RequestObject } from './request-object';

export abstract class WrappedNumberRequestObject<
  T extends WrappedNumber,
> extends RequestObject<T | undefined> {
  protected abstract _factory: (value: number) => T;

  public add(...others: (number | WrappedNumberRequestObject<T>)[]) {
    return new ArithmeticalWrappedNumbersRequestObject<T>(
      this._factory,
      [this, ...others],
      (operands) => operands.reduce((acc, operand) => acc + operand, 0),
    );
  }

  public sub(...others: (number | WrappedNumberRequestObject<T>)[]) {
    return new ArithmeticalWrappedNumbersRequestObject<T>(
      this._factory,
      [this, ...others],
      (operands) =>
        operands[0] -
        operands.slice(1).reduce((acc, operand) => acc + operand, 0),
    );
  }

  public neg() {
    return new ArithmeticalWrappedNumbersRequestObject<T>(
      this._factory,
      [this],
      (operands) => -operands[0],
    );
  }

  public mul(...others: (number | WrappedNumberRequestObject<T>)[]) {
    return new ArithmeticalWrappedNumbersRequestObject<T>(
      this._factory,
      [this, ...others],
      (operands) => operands.reduce((acc, operand) => acc * operand, 1),
    );
  }

  public div(...others: (number | WrappedNumberRequestObject<T>)[]) {
    return new ArithmeticalWrappedNumbersRequestObject<T>(
      this._factory,
      [this, ...others],
      (operands) =>
        operands[0] /
        operands.slice(1).reduce((acc, operand) => acc * operand, 1),
    );
  }

  public toAlphaValue(): CastWrappedNumberRequestObject<T, AlphaValue> {
    return new CastWrappedNumberRequestObject(
      this,
      (value) => new AlphaValue(value),
    );
  }

  public toCoordinate(): CastWrappedNumberRequestObject<T, Coordinate> {
    return new CastWrappedNumberRequestObject(
      this,
      (value) => new Coordinate(value),
    );
  }

  public toDelta(): CastWrappedNumberRequestObject<T, Delta> {
    return new CastWrappedNumberRequestObject(
      this,
      (value) => new Delta(value),
    );
  }

  public toLength(): CastWrappedNumberRequestObject<T, Length> {
    return new CastWrappedNumberRequestObject(
      this,
      (value) => new Length(value),
    );
  }

  public toPercentage(): CastWrappedNumberRequestObject<T, Percentage> {
    return new CastWrappedNumberRequestObject(
      this,
      (value) => new Percentage(value),
    );
  }
}

export class CastWrappedNumberRequestObject<
  F extends WrappedNumber,
  T extends WrappedNumber,
> extends WrappedNumberRequestObject<T> {
  protected _factory: (value: number) => T;
  private _wrappedNumberRequestObject: WrappedNumberRequestObject<F>;

  constructor(
    wrappedNumberRequestObject: WrappedNumberRequestObject<F>,
    factory: (value: number) => T,
  ) {
    super();
    this._factory = factory;
    this._wrappedNumberRequestObject = wrappedNumberRequestObject;
  }

  public getReactiveValue(context: Context): ReactiveValue<T | undefined> {
    const reactiveValue =
      this._wrappedNumberRequestObject.getReactiveValue(context);
    return new FunctionalReactiveValue([reactiveValue], () => {
      const value = reactiveValue.getValue()?.getNumber();
      if (value === undefined) {
        return undefined;
      }
      return this._factory(value);
    });
  }
}

export class ArithmeticalWrappedNumbersRequestObject<
  T extends WrappedNumber,
> extends WrappedNumberRequestObject<T> {
  protected _factory: (value: number) => T;

  private _operands: (number | WrappedNumberRequestObject<T>)[];
  private _operation: (operands: number[]) => number;

  constructor(
    factory: (value: number) => T,
    operands: (number | WrappedNumberRequestObject<T>)[],
    operation: (operands: number[]) => number,
  ) {
    super();
    this._operands = operands;
    this._factory = factory;
    this._operation = operation;
  }

  public getReactiveValue(context: Context): ReactiveValue<T | undefined> {
    const reactiveValues = this._operands.map((s) =>
      s instanceof RequestObject
        ? s.getReactiveValue(context)
        : new PrimitiveReactiveValue(this._factory(s)),
    );

    return new FunctionalReactiveValue(reactiveValues, () => {
      const res = reactiveValues.map((v) => v.getValue()?.getNumber());
      const filtered = res.filter((v) => v !== undefined);

      if (filtered.length !== res.length) {
        return undefined;
      }

      return this._factory(this._operation(filtered));
    });
  }
}
