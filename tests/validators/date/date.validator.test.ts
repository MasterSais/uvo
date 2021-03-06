import { V_DTE as VALIDATOR_NAME } from '@lib/base-api/names';
import { template, tml } from '@lib/templating-api/template';
import { date as validator } from '@lib/base-api/validators/date';
import { baseCases, emptyMeta, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

const toDate = (value: any) => new Date(value).getTime();

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCases(validator, [], right, wrong, toDate)
  );

  describe('base › template', () =>
    baseCases(template('@date'), [], right, wrong, toDate)
  );

  describe('base › template › short', () =>
    baseCases(tml`@d`, [], [right[0]], [wrong[0]], toDate)
  );

  describe('with error', () =>
    withErrorCases(validator(notNullError()), [[right[0]], [wrong[0]]], null, toDate)
  );

  describe('with meta', () =>
    withErrorCases(validator(errorMetaCase([], [], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta(), toDate)
  );

  describe('with error › template', () =>
    withErrorCases(template('@date!0')([], [notNullError()]), [[right[0]], [wrong[0]]], null, toDate)
  );

  describe('with meta › template', () =>
    withErrorCases(template('@date!0')([], [errorMetaCase([], [], VALIDATOR_NAME)]), [[wrong[0]]], emptyMeta(), toDate)
  );
});