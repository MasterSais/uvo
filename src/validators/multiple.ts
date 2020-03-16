import { V_MLP } from '../names';
import { Error, Invertible, Validator } from '../types';
import { multipleFactory } from '../utilities';

/**
 * {@link docs/validators/multiple}
 */
export const multiple = multipleFactory(V_MLP);

/**
 * {@link docs/validators/integer}
 */
export const integer: Invertible<((error?: Error) => Validator<number, number>)> = (error?: Error) => multipleFactory(V_MLP)(1, error);

integer.not = (error?: Error) => multipleFactory(V_MLP).not(1, error);

/**
 * {@link docs/validators/integer}
 */
export const even: Invertible<((error?: Error) => Validator<number, number>)> = (error?: Error) => multipleFactory(V_MLP)(2, error);

even.not = (error?: Error) => multipleFactory(V_MLP).not(2, error);