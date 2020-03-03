import { Processor } from '../types';

/**
 * Clamps value to required boundaries.
 * 
 * Type: processor. Processors do not check params' and values' types. Escape usage without validators.
 * 
 * @param {number|string|boolean} min Left bound to clamp to.
 * @param {number|string|boolean} max Right bound to clamp to.
 * @return {Processor} Function that takes value.
 */
export const clamp = <T>(min: T, max: T): Processor<T, T> =>
  (value: T): T => value < min ? min : (value > max ? max : value);