import { Validator } from '@lib/base-api/types';

const roundMethods = {
  floor: 'floor',
  ceil: 'ceil'
};

/**
 * {@link docs/base-api/processors/round}
 */
export const round = (method?: 'floor' | 'ceil'): Validator<number, number> =>
  Math[roundMethods[method] || 'round'];