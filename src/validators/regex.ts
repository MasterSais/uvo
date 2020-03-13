import { V_REG } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, invertCondition, isRegEx, makeInvertible, setMetaValidator, throwValidatorError } from '../utilities';

/**
 * {@link docs/validators/regex}
 */
export const regex = makeInvertible<(<T>(match: RegExp, error?: Error) => Validator<T>)>(
  (invert: boolean) => <T>(match: RegExp, error?: Error): Validator<T> =>
    (
      isRegEx(match)
        ? (
          (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
            (
              invertCondition(match.test(value as any), invert)
            )
              ? value : applyError(error, onError, setMetaValidator(meta, V_REG, [match]))
        )
        : throwValidatorError(V_REG)
    )
);