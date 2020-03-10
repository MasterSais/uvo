import { V_EQ } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, invertCondition, makeInvertible, setMetaValidator } from '../utilities';

type Equal = <T>(match: T, error?: Error) => Validator<T>;

/**
 * {@link docs/validators/equal}
 */
export const equal = makeInvertible<Equal>(
  (invert: boolean) => <T>(match: T, error?: Error): Validator<T> =>
    (
      (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
        (
          invertCondition(value === match, invert)
        )
          ? value : applyError(error, onError, setMetaValidator(meta, V_EQ, [match]))
    )
);