import { ReactiveValue } from 'lib/reactive-values';

import { Context } from './context';

export type RequestFunction<T> = (context: Context) => ReactiveValue<T>;
