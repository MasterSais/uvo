import { transform as validator } from '@lib/base-api/groupers/transform';
import { G_TRM as VALIDATOR_NAME } from '@lib/base-api/names';
import { baseCasesWithParams, paramsCases } from '@test/utilities';
import { right, rightParams, wrongParams } from './cases';

describe(`grouper › ${VALIDATOR_NAME}`, () => {
  describe('params', () =>
    paramsCases(validator, rightParams, wrongParams, VALIDATOR_NAME)
  );

  describe('base', () =>
    baseCasesWithParams(validator, right, [])
  );
});