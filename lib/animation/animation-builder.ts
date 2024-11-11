import { AlphaValue } from 'lib/data-types';
import { Circle, GeometryElement } from 'lib/geometry-elements';
import {
  ReactiveValue,
  SimpleWrappedReactiveValue,
  ensureReactive,
} from 'lib/reactive-values';
import { Context } from 'lib/request-object';

import { GeometryElementManager } from './geometry-element-manager';
import { Identifier } from './identifier';
import { QueryBuilder } from './query-builder';
import { TransitionBuilder } from './transition-builder';
import { UpdatedValuesMap } from './updated-values-map';

export class AnimationBuilder {
  private _duration: number = 0;
  private _context: Context;

  private _marks: Map<Identifier, AlphaValue> = new Map();

  constructor({
    geometryElementManager,
    updatedValues,
  }: {
    geometryElementManager: GeometryElementManager;
    updatedValues: UpdatedValuesMap;
  }) {
    const newUpdatedValues = new Map(
      updatedValues as Map<unknown, unknown>,
    ) as UpdatedValuesMap;
    this._context = {
      oldUpdatedValues: updatedValues,
      updatedValues: newUpdatedValues,
      progress: new SimpleWrappedReactiveValue(
        ensureReactive(new AlphaValue(1)),
      ),
      geometryElementManager,
    };
  }

  public duration(duration: number): void {
    this._duration = duration;
  }

  public markStart(id: Identifier): void {
    this.markAt(new AlphaValue(0), id);
  }

  public markEnd(id: Identifier): void {
    this.markAt(new AlphaValue(1), id);
  }

  public markAt(progress: AlphaValue, id: Identifier): void {
    this._marks.set(id, progress);
  }

  public build(): {
    progress: SimpleWrappedReactiveValue<AlphaValue>;
    duration: number;
    marks: Map<Identifier, AlphaValue>;
  } {
    this._context.oldUpdatedValues.clear();
    this._context.updatedValues.forEach((value, key) => {
      this._context.oldUpdatedValues.set(key, value);
    });

    return {
      duration: this._duration,
      progress: this._context.progress,
      marks: this._marks,
    };
  }

  /**
   * Returns the requested element or creates a new one if it doesn't exist.
   * @param element - The element to get or create or its identifier.
   * @returns The requested element.
   */
  public getElement(element: GeometryElement | Identifier): GeometryElement {
    return this._context.geometryElementManager.requestGeometryElements([
      element,
    ])[0];
  }

  public getCircle(
    element: GeometryElement | Identifier,
  ): ReactiveValue<Circle> {
    return this._context.geometryElementManager.requestGeometryElements(
      element,
    )[0].shape as SimpleWrappedReactiveValue<Circle>;
  }

  /**
   * Returns the requested elements or creates new ones if they don't exist.
   * @param elements - The elements to get or create or their identifiers.
   * @returns The requested elements.
   */
  public select(
    ...elements: (
      | Identifier
      | GeometryElement
      | Iterable<Identifier | GeometryElement>
    )[]
  ): TransitionBuilder {
    const queryBuilder = new QueryBuilder(this._context.geometryElementManager);
    queryBuilder.add(...elements);

    return new TransitionBuilder({
      elements: queryBuilder.build(),
      context: this._context,
    });
  }

  public query(query: (queryBuilder: QueryBuilder) => void): TransitionBuilder {
    const queryBuilder = new QueryBuilder(this._context.geometryElementManager);
    query(queryBuilder);
    const elements = queryBuilder.build();
    return new TransitionBuilder({
      elements,
      context: this._context,
    });
  }
}
