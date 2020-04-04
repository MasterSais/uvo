import { V_DTE as VALIDATOR_NAME } from '@lib/names';
import { template, tml } from '@lib/template/template';
import { date as validator } from '@lib/validators/date';
import { baseCases, emptyMeta, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

const toDate = (value: any) => new Date(value).getTime();

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCases(validator, [], right, wrong, toDate)
  );

  describe('base › check', () =>
    baseCases(validator.check, [], right, wrong)
  );

  describe('base › template', () =>
    baseCases(template('@date')(), [], right, wrong, toDate)
  );

  describe('base › template › short', () =>
    baseCases(tml`@d`(), [], [right[0]], [wrong[0]], toDate)
  );

  describe('with error', () =>
    withErrorCases(validator(notNullError()), [[right[0]], [wrong[0]]], null, toDate)
  );

  describe('with meta', () =>
    withErrorCases(validator(errorMetaCase([], [], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta(), toDate)
  );

  describe('with error › check', () =>
    withErrorCases(validator.check(notNullError()), [[right[0]], [wrong[0]]])
  );

  describe('with meta › check', () =>
    withErrorCases(validator.check(errorMetaCase([], [], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta())
  );
});