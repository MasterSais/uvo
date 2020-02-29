import { Processor } from '../types';

export const clamp = (min: number, max: number): Processor<number, number> =>
  (value: number): number => value < min && min || value > max && max || value;