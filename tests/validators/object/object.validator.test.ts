import { V_OBJ as VALIDATOR_NAME } from '@lib/names';
import { template, tml } from '@lib/template/template';
import { object as validator } from '@lib/validators/object';
import { baseCases, baseCasesWithParams, emptyMeta, errorMetaCase, notNullError, paramsCases, withErrorCases } from '@test/utilities';
import { right, rightParams, rightTemplate, wrong, wrongParams, wrongTemplate } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () =>
    paramsCases(validator, rightParams, wrongParams, VALIDATOR_NAME)
  );

  describe('base', () =>
    baseCasesWithParams(validator, right, wrong)
  );

  describe('base › template', () =>
    baseCases(template('@object'), [], rightTemplate, wrongTemplate)
  );

  describe('base › template › short', () =>
    baseCases(tml`@o`, [], [rightTemplate[0]], [wrongTemplate[0]])
  );

  describe('with error', () =>
    withErrorCases(validator(null, notNullError()), [[right[0][1]], [wrong[0][1]]])
  );

  describe('with meta', () =>
    withErrorCases(validator(null, errorMetaCase([], [], VALIDATOR_NAME)), [[wrong[0][1]]], emptyMeta())
  );
});