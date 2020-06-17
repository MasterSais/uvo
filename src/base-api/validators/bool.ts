import { V_BLN } from '@lib/base-api/names';
import { ValidatorError, ValidatorErrorCallback, MetaData, Validator } from '@lib/base-api/types';
import { applyError, extendMeta } from '@lib/base-api/utilities/utilities';

const possibleValues = [false, true, 0, 1, '0', '1', 'false', 'true'];

/**
 * {@link docs/base-api/validators/bool}
 */
export const bool = <T>(error?: ValidatorError): Validator<T, boolean> =>
  (
    (value: T, onError?: ValidatorErrorCallback, meta?: MetaData): boolean => {
      const index: number = (
        possibleValues.indexOf(value as any)
      );

      extendMeta(meta, value, V_BLN);

      return (
        index >= 0
          ? Boolean(index % 2)
          : applyError(error, onError, meta)
      );
    }
  );