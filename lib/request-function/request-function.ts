import { RequestObject } from '../request-object/request-object';

export type RequestFunction<T> = (...args: any[]) => RequestObject<T>;
