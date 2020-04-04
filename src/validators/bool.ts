import { V_BLN } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, makeCheckable, setMetaValidator } from '../utilities';

const possibleValues = [false, true, 0, 1, '0', '1', 'false', 'true'];

/**
 * {@link docs/validators/bool}
 */
export const bool = makeCheckable<(<T>(error?: Error) => Validator<T, boolean>), (<T>(error?: Error) => Validator<T, T>)>(
  (checkOnly: boolean) => <T>(error?: Error): Validator<T, boolean> =>
    (
      (value: T, onError?: ErrorCallback, meta?: MetaData): boolean => {
        const index: number = (
          possibleValues.indexOf(value as any)
        );

        return (
          index >= 0
            ? (
              checkOnly
                ? possibleValues[index] as any
                : Boolean(index % 2)
            )
            : applyError(error, onError, setMetaValidator(meta, V_BLN))
        );
      }
    )
);