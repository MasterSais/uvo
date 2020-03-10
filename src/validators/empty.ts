import { V_EM } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, invertCondition, isEmpty, makeInvertible, setMetaValidator } from '../utilities';

/**
 * {@link docs/validators/empty}
 */
export const empty = makeInvertible<(<T>(error?: Error) => Validator<T>)>(
  (invert: boolean) => <T>(error?: Error): Validator<T> =>
    (
      (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
        invertCondition(isEmpty(value), invert)
          ? value
          : applyError(error, onError, setMetaValidator(meta, V_EM, []))
    )
);