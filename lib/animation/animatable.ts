import { AnimationBuilder } from './animation-builder';

export type Animatable =
  | Iterable<Animatable>
  | ((animationBuilder: AnimationBuilder) => void);
