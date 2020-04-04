import { V_DTE } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, makeCheckable, setMetaValidator } from '../utilities';

/**
 * {@link docs/validators/date}
 */
export const date = makeCheckable<(<T>(error?: Error) => Validator<T, number>), (<T>(error?: Error) => Validator<T, T>)>(
  (checkOnly: boolean) => <T>(error?: Error): Validator<T, number> =>
    (
      (value: T, onError?: ErrorCallback, meta?: MetaData): number =>
        (
          value !== null
          && !isNaN(new Date(value as any) as any)
        )
          ? (
            checkOnly
              ? value as any
              : new Date(value as any).getTime()
          )
          : applyError(error, onError, setMetaValidator(meta, V_DTE))
    )
);