import { Validator } from '../types';

const roundMethods = {
  floor: 'floor',
  ceil: 'ceil'
};

/**
 * {@link docs/processors/round}
 */
export const round = (method?: 'floor' | 'ceil'): Validator<number, number> =>
  Math[roundMethods[method] || 'round'];