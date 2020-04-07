import { V_LEN, V_MNLEN, V_MXLEN } from '@lib/classic-api/names';
import { lengthFactory } from '@lib/classic-api/utilities';

/**
 * {@link docs/classic-api/validators/length}
 */
export const length = lengthFactory(V_LEN, (value: number, len: number) => value === len);

/**
 * {@link docs/classic-api/validators/min-len}
 */
export const minLen = lengthFactory(V_MNLEN, (value: number, len: number) => value >= len);

/**
 * {@link docs/classic-api/validators/max-len}
 */
export const maxLen = lengthFactory(V_MXLEN, (value: number, len: number) => value <= len);