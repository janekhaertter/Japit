import { AlphaValue } from 'lib/data-types';
import { Drawing } from 'lib/drawing/drawing';
import {
  PrimitiveReactiveValue,
  SimpleWrappedReactiveValue,
} from 'lib/reactive-values';

import { Identifier } from './identifier';

export enum PlaybackDirection {
  Forward = 1,
  Backward = -1,
}

export class AnimationPlayer {
  private _duration: number;
  private _progress: SimpleWrappedReactiveValue<AlphaValue>;
  private _drawing: Drawing;
  private _running: symbol | undefined = undefined;
  private _marks: Map<Identifier, AlphaValue>;

  constructor({
    duration,
    progress,
    drawing,
    marks,
  }: {
    duration: number;
    progress: SimpleWrappedReactiveValue<AlphaValue>;
    drawing: Drawing;
    marks: Map<Identifier, AlphaValue>;
  }) {
    this._duration = duration;
    this._progress = progress;
    this._drawing = drawing;
    this._marks = marks;
  }

  get marks(): Map<Identifier, AlphaValue> {
    return this._marks;
  }

  private normalizedTime(absoluteTime: number): number {
    return absoluteTime / this._duration;
  }

  public seekProgress(to: AlphaValue): void {
    this._progress.wrap(new PrimitiveReactiveValue(to));
    this._drawing.draw();
  }

  public seek(to: number): void {
    this.seekProgress(new AlphaValue(this.normalizedTime(to)));
  }

  public seekMark(id: Identifier): void {
    const mark = this._marks.get(id);
    if (mark === undefined) {
      throw new Error(`No mark with identifier ${String(id)}`);
    }
    this.seekProgress(mark);
  }

  public stop(): void {
    this._running = undefined;
  }

  public play({
    to,
    progress,
    mark,
    direction = PlaybackDirection.Forward,
    playbackRate = 1,
  }: {
    to?: number;
    progress?: AlphaValue;
    mark?: Identifier;
    direction?: PlaybackDirection;
    playbackRate?: number;
  } = {}): void {
    // time the animation was started (will be initialized on first frame)
    let lastUpdate: number | undefined = undefined;

    const id = Symbol();
    this._running = id;

    const specifiedTargets = [to, progress, mark]
      .map((v) => (v === undefined ? 0 : 1))
      .reduce<number>((acc, curr) => acc + curr, 0);

    if (specifiedTargets > 1) {
      throw new Error(
        'At most one of "to", "progress", or "mark" must be specified',
      );
    }

    // compute target time
    let targetTime = direction === PlaybackDirection.Backward ? 0 : 1;

    if (to !== undefined) {
      targetTime = this.normalizedTime(to);
    } else if (progress !== undefined) {
      targetTime = progress.getNumber();
    } else if (mark !== undefined) {
      const markValue = this._marks.get(mark);
      if (markValue === undefined) {
        throw new Error(`No mark with identifier ${String(mark)}`);
      }
      targetTime = markValue.getNumber();
    }

    if (playbackRate <= 0) {
      throw new Error('playbackRate must be positive');
    }

    const callback = (timestamp: number) => {
      if (this._running !== id) {
        return;
      }

      if (lastUpdate === undefined) {
        lastUpdate = timestamp;
      }

      const elapsedSeconds = (timestamp - lastUpdate) / 1000;

      lastUpdate = timestamp;

      const newProgress =
        this._progress.getValue().getNumber() +
        direction * playbackRate * this.normalizedTime(elapsedSeconds);

      this._progress.wrap(
        new PrimitiveReactiveValue(new AlphaValue(newProgress)),
      );

      this._drawing.draw();

      // stop if we reached targetTime
      if (
        (direction === PlaybackDirection.Forward &&
          this._progress.getValue().getNumber() >= targetTime) ||
        (direction === PlaybackDirection.Backward &&
          this._progress.getValue().getNumber() <= targetTime)
      ) {
        this._running = undefined;
      }
      // otherwise, request next frame
      else {
        requestAnimationFrame(callback);
      }
    };

    requestAnimationFrame(callback);
  }
}
