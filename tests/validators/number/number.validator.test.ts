import { V_NUM as VALIDATOR_NAME } from '@lib/base-api/names';
import { template, tml } from '@lib/templating-api/template';
import { number as validator } from '@lib/base-api/validators/number';
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

  describe('with error › template', () =>
    withErrorCases(template('@number!0')([], [notNullError()]), [[right[0]], [wrong[0]]])
  );

  describe('with meta › template', () =>
    withErrorCases(template('@number!0')([], [errorMetaCase([], [], VALIDATOR_NAME)]), [[wrong[0]]], emptyMeta())
  );
});