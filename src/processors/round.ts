import { Validator } from '../types';

/**
 * {@link docs/processors/round}
 */
export const round = (method: 'round' | 'floor' | 'ceil' = 'round'): Validator<number, number> =>
  Math[method];