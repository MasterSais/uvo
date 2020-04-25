import { V_EVN, V_INT, V_MLP } from '@lib/base-api/names';
import { Error, Invertible, Validator } from '@lib/base-api/types';
import { multipleFactory } from '@lib/base-api/utilities/factories';

/**
 * {@link docs/base-api/validators/multiple}
 */
export const multiple = multipleFactory(V_MLP);

/**
 * {@link docs/base-api/validators/integer}
 */
export const integer: Invertible<((error?: Error) => Validator<number, number>)> = (error?: Error) => multipleFactory(V_INT)(1, error);

integer.not = (error?: Error) => multipleFactory(V_INT).not(1, error);

/**
 * {@link docs/base-api/validators/even}
 */
export const even: Invertible<((error?: Error) => Validator<number, number>)> = (error?: Error) => multipleFactory(V_EVN)(2, error);

even.not = (error?: Error) => multipleFactory(V_EVN).not(2, error);