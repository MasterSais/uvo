import { S_DFT as VALIDATOR_NAME } from '@lib/base-api/names';
import { useDefault as validator } from '@lib/base-api/spreaders/use-default';
import { compile } from '@lib/templating-api/template';
import { baseCasesWithParams, paramsCases } from '@test/utilities';
import { cases, rightParams, templateCases, wrongParams } from './cases';

describe(`spreader › ${VALIDATOR_NAME}`, () => {
  describe('params', () =>
    paramsCases(validator, rightParams, wrongParams, VALIDATOR_NAME)
  );

  describe('base', () =>
    baseCasesWithParams(validator, cases, [])
  );

  describe('base › compile', () =>
    baseCasesWithParams(() => compile(`@default(10, @string)`)(), templateCases, [])
  );

  describe('base › compile › injection', () =>
    baseCasesWithParams(() => compile(`@default($0, @string)`)([() => 10]), templateCases, [])
  );
});