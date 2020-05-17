import { C_FLB as VALIDATOR_NAME } from '@lib/base-api/names';
import { fallback as validator } from '@lib/base-api/spreaders/fallback';
import { number } from '@lib/base-api/validators/number';
import { template } from '@lib/templating-api/template';
import { baseCasesWithParams, paramsCases } from '@test/utilities';
import { right, rightParams, wrongParams } from './cases';

describe(`container › ${VALIDATOR_NAME}`, () => {
  describe('params', () =>
    paramsCases(validator, rightParams, wrongParams, VALIDATOR_NAME)
  );

  describe('base', () =>
    baseCasesWithParams(param => validator(param, number()), right, [])
  );

  describe('base › template', () =>
    baseCasesWithParams(() => template(`@fallback(10, @number)`)(), right, [])
  );

  describe('base › template › injections', () =>
    baseCasesWithParams(param => template(`@fallback($0, @number)`)([param]), right, [])
  );
});