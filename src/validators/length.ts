import { V_LEN, V_MNLEN, V_MXLEN } from '../names';
import { lengthFactory } from '../utilities';

/**
 * {@link docs/validators/length}
 */
export const length = lengthFactory(V_LEN, (value: number, len: number) => value === len);

/**
 * {@link docs/validators/min-len}
 */
export const minLen = lengthFactory(V_MNLEN, (value: number, len: number) => value >= len);

/**
 * {@link docs/validators/max-len}
 */
export const maxLen = lengthFactory(V_MXLEN, (value: number, len: number) => value <= len);