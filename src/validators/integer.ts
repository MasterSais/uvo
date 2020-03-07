import { V_INT } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, isNumber, setMetaValidator } from '../utilities';

/**
 * {@link docs/validators/integer}
 */
export const integer = (error?: Error): Validator<number> =>
  (value: number, onError?: ErrorCallback, meta?: MetaData): number =>
    (
      isNumber(value)
      && value % 1 === 0
    )
      ? value : applyError(error, onError, setMetaValidator(meta, V_INT));

/**
 * {@link docs/validators/integer}
 */
export const int = integer;