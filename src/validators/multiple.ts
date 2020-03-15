import { V_MLP } from '../names';
import { Error, ErrorCallback, Invertible, MetaData, Validator } from '../types';
import { applyError, bind, invertCondition, invertError, isNumber, makeInvertible, setMetaValidator, throwValidatorError } from '../utilities';

/**
 * {@link docs/validators/multiple}
 */
export const multiple = makeInvertible<((multiplier: number, error?: Error) => Validator<number>)>(
  (invert: boolean) => (multiplier: number, error?: Error): Validator<number> =>
    (
      isNumber(multiplier)
        ? (
          (value: number, onError?: ErrorCallback, meta?: MetaData): number =>
            (
              invertCondition((
                isNumber(value) && value % multiplier === 0
              ), invert)
            )
              ? value : applyError(error, onError, setMetaValidator(meta, invertError(V_MLP, invert), [multiplier]))
        )
        : throwValidatorError(V_MLP)
    )
);

/**
 * {@link docs/validators/integer}
 */
export const integer: Invertible<(error?: Error) => Validator<number, number>> = bind(multiple, 1);

integer.not = bind(multiple.not, 1);