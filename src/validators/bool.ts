import { V_BLN } from '../names';
import { Error, ErrorCallback, MetaData, Processor } from '../types';
import { applyError, setMetaValidator } from '../utilities';

const possibleValues = [false, true, 0, 1, '0', '1', 'false', 'true'];

/**
 * {@link docs/validators/bool}
 */
export const bool = <T>(error?: Error): Processor<T, boolean> =>
  (value: T, onError?: ErrorCallback, meta?: MetaData): boolean => {
    const index: number = (
      possibleValues.indexOf(value as any)
    );

    return (
      index >= 0
        ? Boolean(index % 2)
        : applyError(error, onError, setMetaValidator(meta, V_BLN))
    );
  };

/**
 * {@link docs/validators/bool}
 */
export const bln = bool;