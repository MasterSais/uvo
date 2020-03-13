import { V_NUM } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, isArray, isFinite, makeCheckable, setMetaValidator } from '../utilities';

/**
 * {@link docs/validators/number}
 */
export const number = makeCheckable<(<T extends unknown>(error?: Error) => Validator<T, number>), (<T extends unknown>(error?: Error) => Validator<T, T>)>(
  (checkOnly: boolean) => <T extends unknown>(error?: Error): Validator<T, number> =>
    (
      (value: T, onError?: ErrorCallback, meta?: MetaData): number =>
        (
          value !== null
          && value !== String()
          && !isArray(value)
          && isFinite(value)
        )
          ? (checkOnly ? value as any : +value) : applyError(error, onError, setMetaValidator(meta, V_NUM))
    )
);