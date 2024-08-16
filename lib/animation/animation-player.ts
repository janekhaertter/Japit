import { AlphaValue } from 'lib/data-types';
import { Drawing } from 'lib/drawing/drawing';
import {
  PrimitiveReactiveValue,
  SimpleWrappedReactiveValue,
} from 'lib/reactive-values';

export enum PlaybackDirection {
  Forward = 1,
  Backward = -1,
}

export class AnimationPlayer {
  private _duration: number;
  private _progress: SimpleWrappedReactiveValue<AlphaValue>;
  private _drawing: Drawing;
  private _running: symbol | undefined = undefined;

  constructor({
    duration,
    progress,
    drawing,
  }: {
    duration: number;
    progress: SimpleWrappedReactiveValue<AlphaValue>;
    drawing: Drawing;
  }) {
    this._duration = duration;
    this._progress = progress;
    this._drawing = drawing;
  }

  private normalizedTime(absoluteTime: number): number {
    return absoluteTime / this._duration;
  }

  public seek(to: number): void {
    this._progress.wrap(
      new PrimitiveReactiveValue(new AlphaValue(this.normalizedTime(to))),
    );
    this._drawing.draw();
  }

  public stop(): void {
    this._running = undefined;
  }

  public play({
    to,
    direction = PlaybackDirection.Forward,
    playbackRate = 1,
  }: {
    to?: number;
    direction?: PlaybackDirection;
    playbackRate?: number;
  } = {}): void {
    // time the animation was started (will be initialized on first frame)
    let lastUpdate: number | undefined = undefined;

    const id = Symbol();
    this._running = id;

    // normalize
    to = this.normalizedTime(
      to ?? (direction === PlaybackDirection.Backward ? 0 : this._duration),
    );

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

      // stop if we reached to
      if (
        (direction === PlaybackDirection.Forward &&
          this._progress.getValue().getNumber() >= to) ||
        (direction === PlaybackDirection.Backward &&
          this._progress.getValue().getNumber() <= to)
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
