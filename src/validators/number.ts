import { V_NUM } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, isArray, isFinite, isNumber, makeCheckable, setMetaValidator } from '../utilities';

/**
 * {@link docs/validators/number}
 */
export const number = makeCheckable<(<T extends unknown>(error?: Error) => Validator<T, number>)>(
  (checkOnly: boolean) => <T extends unknown>(error?: Error): Validator<T, number> =>
    (
      (value: T, onError?: ErrorCallback, meta?: MetaData): number =>
        (
          checkOnly
            ?
            (
              isNumber(value)
              && isFinite(value)
            )
            :
            (
              value !== null
              && value !== String()
              && !isArray(value)
              && isFinite(value)
            )
        )
          ? +(value) : applyError(error, onError, setMetaValidator(meta, V_NUM))
    )
);