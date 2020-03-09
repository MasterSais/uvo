import { Processor } from '../types';

/**
 * {@link docs/processors/round}
 */
export const round = (method: 'round' | 'floor' | 'ceil' = 'round'): Processor<number, number> =>
  Math[method];