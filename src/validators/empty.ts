import { V_EM } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, invertCondition, isEmpty, makeInvertible, setMetaValidator } from '../utilities';

type Empty = <T>(error?: Error) => Validator<T>;

/**
 * {@link docs/validators/empty}
 */
export const empty = makeInvertible<Empty>(
  (invert: boolean) => <T>(error?: Error): Validator<T> =>
    (
      (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
        invertCondition(isEmpty(value), invert)
          ? value
          : applyError(error, onError, setMetaValidator(meta, V_EM, []))
    )
);