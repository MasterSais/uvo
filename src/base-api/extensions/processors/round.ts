import { Validator } from '@lib/base-api/types';

const roundMethods = {
  floor: 'floor',
  ceil: 'ceil'
};

/**
 * @name {round}
 * 
 * @template {via `provide`}
 * 
 * @scheme {round(method?: 'floor' | 'ceil'): Validator<number, number>}
 * 
 * @desc Round input number with specific method.
 * 
 * {@link docs/base-api/type-processor}
 * 
 * @param {string=} method Specific method.
 * 
 * {@link docs/base-api/processor-result}
 */
export const round = (method?: 'floor' | 'ceil'): Validator<number, number> =>
  Math[roundMethods[method] || 'round'];