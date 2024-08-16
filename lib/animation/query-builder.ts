import { GeometryElement } from 'lib/geometry-elements';

import { GeometryElementManager } from './geometry-element-manager';
import { Identifier } from './identifier';

export class QueryBuilder {
  private _currentSelection: GeometryElement[] = [];
  private _geometryElementManager: GeometryElementManager;

  constructor(geometryElementManager: GeometryElementManager) {
    this._geometryElementManager = geometryElementManager;
  }

  public select(
    ...elements: (
      | Identifier
      | GeometryElement
      | Iterable<Identifier | GeometryElement>
    )[]
  ): QueryBuilder {
    const requestedElements = new Set(
      this._geometryElementManager.requestGeometryElements(...elements),
    );

    this._currentSelection = this._currentSelection.filter((e) =>
      requestedElements.has(e),
    );

    return this;
  }

  public add(
    ...elements: (
      | Identifier
      | GeometryElement
      | Iterable<Identifier | GeometryElement>
    )[]
  ): QueryBuilder {
    this._currentSelection.push(
      ...this._geometryElementManager.requestGeometryElements(...elements),
    );
    return this;
  }

  public addRange(from: number, to: number): QueryBuilder {
    const elements = Array.from({ length: to - from + 1 }, (_, i) => from + i);
    return this.add(elements);
  }

  public remove(
    ...elements: (
      | Identifier
      | GeometryElement
      | Iterable<Identifier | GeometryElement>
    )[]
  ): QueryBuilder {
    const requestedElements = new Set(
      this._geometryElementManager.requestGeometryElements(...elements),
    );

    this._currentSelection = this._currentSelection.filter(
      (e) => !requestedElements.has(e),
    );

    return this;
  }

  public removeRange(from: number, to: number): QueryBuilder {
    this._currentSelection = this._currentSelection.filter(
      (e) => !(typeof e === 'number' && e >= from && e <= to),
    );
    return this;
  }

  public clear(): QueryBuilder {
    this._currentSelection = [];
    return this;
  }

  public all(): QueryBuilder {
    this._currentSelection = this._geometryElementManager.getGeometryElements();
    return this;
  }

  public build(): GeometryElement[] {
    return this._currentSelection;
  }
}
