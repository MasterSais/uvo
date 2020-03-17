import { V_EVN, V_INT, V_MLP } from '../names';
import { Error, Invertible, Validator } from '../types';
import { multipleFactory } from '../utilities';

/**
 * {@link docs/validators/multiple}
 */
export const multiple = multipleFactory(V_MLP);

/**
 * {@link docs/validators/integer}
 */
export const integer: Invertible<((error?: Error) => Validator<number, number>)> = (error?: Error) => multipleFactory(V_INT)(1, error);

integer.not = (error?: Error) => multipleFactory(V_INT).not(1, error);

/**
 * {@link docs/validators/even}
 */
export const even: Invertible<((error?: Error) => Validator<number, number>)> = (error?: Error) => multipleFactory(V_EVN)(2, error);

even.not = (error?: Error) => multipleFactory(V_EVN).not(2, error);