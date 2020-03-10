import { V_INT } from '../names';
import { Error, ErrorCallback, MetaData, Validator } from '../types';
import { applyError, invertCondition, isNumber, makeInvertible, setMetaValidator } from '../utilities';

/**
 * {@link docs/validators/integer}
 */
export const integer = makeInvertible<((error?: Error) => Validator<number>)>(
  (invert: boolean) => (error?: Error): Validator<number> =>
    (
      (value: number, onError?: ErrorCallback, meta?: MetaData): number =>
        (
          invertCondition((
            isNumber(value) && value % 1 === 0
          ), invert)
        )
          ? value : applyError(error, onError, setMetaValidator(meta, V_INT))
    )
);