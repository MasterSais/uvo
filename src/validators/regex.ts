import { V_REG } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, invertCondition, makeInvertible, setMetaValidator, throwValidatorError } from '../utilities';

/**
 * {@link docs/validators/regex}
 */
export const regex = makeInvertible<(<T extends unknown>(match: RegExp, error?: Error) => Validator<T>)>(
  (invert: boolean) => <T extends unknown>(match: RegExp, error?: Error): Validator<T> =>
    (
      (match && match.constructor === RegExp)
        ? (
          (value: T, onError?: ErrorCallback, meta?: MetaData): T =>
            (
              invertCondition(match.test(value as string), invert)
            )
              ? value : applyError(error, onError, setMetaValidator(meta, V_REG, [match]))
        )
        : throwValidatorError(V_REG)
    )
);