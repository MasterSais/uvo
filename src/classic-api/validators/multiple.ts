import { V_EVN, V_INT, V_MLP } from '@lib/classic-api/names';
import { Error, Invertible, Validator } from '@lib/classic-api/types';
import { multipleFactory } from '@lib/classic-api/utilities';

/**
 * {@link docs/classic-api/validators/multiple}
 */
export const multiple = multipleFactory(V_MLP);

/**
 * {@link docs/classic-api/validators/integer}
 */
export const integer: Invertible<((error?: Error) => Validator<number, number>)> = (error?: Error) => multipleFactory(V_INT)(1, error);

integer.not = (error?: Error) => multipleFactory(V_INT).not(1, error);

/**
 * {@link docs/classic-api/validators/even}
 */
export const even: Invertible<((error?: Error) => Validator<number, number>)> = (error?: Error) => multipleFactory(V_EVN)(2, error);

even.not = (error?: Error) => multipleFactory(V_EVN).not(2, error);