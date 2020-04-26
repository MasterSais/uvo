import { V_LEN, V_MNLEN, V_MXLEN } from '@lib/base-api/names';
import { lengthFactory } from '@lib/base-api/utilities/factories';

/**
 * {@link docs/base-api/validators/length}
 */
export const length = lengthFactory(V_LEN, (value: number, len: number) => value === len);

/**
 * {@link docs/base-api/validators/min-len}
 */
export const minLen = lengthFactory(V_MNLEN, (value: number, len: number) => value >= len);

/**
 * {@link docs/base-api/validators/max-len}
 */
export const maxLen = lengthFactory(V_MXLEN, (value: number, len: number) => value <= len);