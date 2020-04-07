import { Validator } from '../types';

/**
 * {@link docs/classic-api/processors/random}
 */
export const random = (min: number = 0, max: number = 1, precision: number = 10): Validator<any, number> =>
  (): number => +(Math.random() * (max - min) + min).toFixed(precision);