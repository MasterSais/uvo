import { Processor } from '../types';

/**
 * {@link docs/processors/round}
 */
export const round = (): Processor<number, number> =>
  Math.round;