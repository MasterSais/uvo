import { consecutive } from '../grouping-substitution/consecutive';
import { V_OBJ } from '../names';
import { Error, ErrorCallback, MetaData, ObjectLike, Processor } from '../types';
import { applyError, isObject, setMetaPath, setMetaValidator } from '../utilities';

export const object2 = <T extends ObjectLike, R extends ObjectLike>(params?: Array<[string, ...Array<Processor<any, any>>]>, error?: Error): Processor<T, R> => {
  const validators: Array<[string, ...Array<Processor<any, any>>]> =
    params && params.reduce((data: Array<[string, ...Array<Processor<any, any>>]>, [key, ...processors]) =>
      (data.push([key, consecutive<any>(...processors)]), data), []);

  return (data: T, onError?: ErrorCallback, meta?: MetaData): R =>
    (isObject(data) && data !== null)
      ? (validators
        ? validators.reduce((result: R, [key, processor]) => (
          result[key as keyof R] = processor(data[key], onError, setMetaPath(meta, key)), result), {} as R
        )
        : data) as R
      : applyError(error, onError, setMetaValidator(meta, V_OBJ));
};