import { Processor } from '../types';

/**
 * Round input number.
 * 
 * Type: processor. Processors do not check params' and values' types. Escape usage without validators.
 * 
 * @return {Processor} Function that takes value.
 */
export const round = (): Processor<number, number> =>
  Math.round;

/**
 * @borrows rnd as round
 */
export const rnd = round;