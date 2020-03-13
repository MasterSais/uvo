import { V_BLN } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, makeCheckable, setMetaValidator } from '../utilities';

const possibleValues = [false, true, 0, 1, '0', '1', 'false', 'true'];

/**
 * {@link docs/validators/bool}
 */
export const bool = makeCheckable<(<T>(error?: Error) => Validator<T, boolean>)>(
  (checkOnly: boolean) => <T>(error?: Error): Validator<T, boolean> =>
    (
      (value: T, onError?: ErrorCallback, meta?: MetaData): boolean => {
        const index: number = (
          possibleValues.indexOf(value as any)
        );

        return (
          (index >= 0 && (checkOnly ? index < 2 : true))
            ? Boolean(index % 2)
            : applyError(error, onError, setMetaValidator(meta, V_BLN))
        );
      }
    )
);