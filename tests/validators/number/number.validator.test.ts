import { V_NUM as VALIDATOR_NAME } from '@lib/names';
import { template, tml } from '@lib/template/template';
import { number as validator } from '@lib/validators/number';
import { baseCases, emptyMeta, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCases(validator, [], right, wrong, Number)
  );

  describe('base › check', () =>
    baseCases(validator.check, [], right, wrong)
  );

  describe('base › template', () =>
    baseCases(template('@number'), [], right, wrong, Number)
  );

  describe('base › template › short', () =>
    baseCases(tml`@n`, [], [right[0]], [wrong[0]], Number)
  );

  describe('with error', () =>
    withErrorCases(validator(notNullError()), [[right[0]], [wrong[0]]], null, Number)
  );

  describe('with meta', () =>
    withErrorCases(validator(errorMetaCase([], [], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta(), Number)
  );

  describe('with error › check', () =>
    withErrorCases(validator.check(notNullError()), [[right[0]], [wrong[0]]])
  );

  describe('with meta › check', () =>
    withErrorCases(validator.check(errorMetaCase([], [], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta())
  );
});