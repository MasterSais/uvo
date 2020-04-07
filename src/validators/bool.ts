import { V_BLN } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, extendMeta, makeCheckable } from '../utilities';

const possibleValues = [false, true, 0, 1, '0', '1', 'false', 'true'];

/**
 * {@link docs/classic-api/validators/bool}
 */
export const bool = makeCheckable<(<T>(error?: Error) => Validator<T, boolean>), (<T>(error?: Error) => Validator<T, T>)>(
  (checkOnly: boolean) => <T>(error?: Error): Validator<T, boolean> =>
    (
      (value: T, onError?: ErrorCallback, meta?: MetaData): boolean => {
        const index: number = (
          possibleValues.indexOf(value as any)
        );

        extendMeta(meta, value, V_BLN);

        return (
          index >= 0
            ? (
              checkOnly
                ? possibleValues[index] as any
                : Boolean(index % 2)
            )
            : applyError(error, onError, meta)
        );
      }
    )
);