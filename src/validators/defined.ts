import { V_DEF } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, invertCondition, makeInvertible, setMetaValidator } from '../utilities';

/**
 * {@link docs/validators/defined}
 */
export const defined = makeInvertible<(<T>(error?: Error) => Validator<T>)>(
  (invert: boolean) => <T>(error?: Error): Validator<T> =>
    (
      (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
        invertCondition(value !== undefined, invert)
          ? value
          : applyError(error, onError, setMetaValidator(meta, V_DEF, []))
    )
);