import { transform as validator } from '@lib/classic-api/groupers/transform';
import { G_TRM as VALIDATOR_NAME } from '@lib/classic-api/names';
import { baseCasesWithParams, paramsCases } from '@test/utilities';
import { right, rightParams, wrongParams } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () =>
    paramsCases(validator, rightParams, wrongParams, VALIDATOR_NAME)
  );

  describe('base', () =>
    baseCasesWithParams(validator, right, [])
  );
});