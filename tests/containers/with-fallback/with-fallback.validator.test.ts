import { withFallback as validator } from '@lib/base-api/containers/with-fallback';
import { C_FLB as VALIDATOR_NAME } from '@lib/base-api/names';
import { number } from '@lib/base-api/validators/number';
import { baseCasesWithParams, paramsCases } from '@test/utilities';
import { right, rightParams, wrongParams } from './cases';

describe(`container › ${VALIDATOR_NAME}`, () => {
  describe('params', () =>
    paramsCases(validator, rightParams, wrongParams, VALIDATOR_NAME)
  );

  describe('params', () =>
    baseCasesWithParams(param => validator(param, number()), right, [])
  );
});