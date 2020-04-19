import { V_EM as VALIDATOR_NAME } from '@lib/classic-api/names';
import { empty as validator } from '@lib/classic-api/validators/is';
import { template, tml } from '@lib/templating-api/template';
import { baseCases, emptyMeta, errorMetaCase, invertError, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCases(validator, [], right, wrong)
  );

  describe('base › not', () =>
    baseCases(validator.not, [], wrong, right)
  );

  describe('base › template', () =>
    baseCases(template('@compare(=emp)'), [], right, wrong)
  );

  describe('base › template › not', () =>
    baseCases(template('@compare(!=emp)'), [], wrong, right)
  );

  describe('base › template › short', () =>
    baseCases(tml`@c(=emp)`, [], [right[0]], [wrong[0]])
  );

  describe('with error', () =>
    withErrorCases(validator(notNullError()), [[right[0]], [wrong[0]]])
  );

  describe('with meta', () =>
    withErrorCases(validator(errorMetaCase([], [[null, undefined, '']], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta())
  );

  describe('with error › not', () =>
    withErrorCases(validator.not(notNullError()), [[wrong[0]], [right[0]]])
  );

  describe('with meta › not', () =>
    withErrorCases(validator.not(errorMetaCase([], [[null, undefined, '']], invertError(VALIDATOR_NAME, true))), [[right[0]]], emptyMeta())
  );

  describe('with error › template', () =>
    withErrorCases(template('@compare(=emp)!0')([], [notNullError()]), [[right[0]], [wrong[0]]])
  );

  describe('with meta › template', () =>
    withErrorCases(template('@compare(=emp)!0')([], [errorMetaCase([], [[null, undefined, '']], VALIDATOR_NAME)]), [[wrong[0]]], emptyMeta())
  );

  describe('with error › template › not', () =>
    withErrorCases(template('@compare(!=emp)!0')([], [notNullError()]), [[wrong[0]], [right[0]]])
  );

  describe('with meta › template › not', () =>
    withErrorCases(template('@compare(!=emp)!0')([], [errorMetaCase([], [[null, undefined, '']], invertError(VALIDATOR_NAME, true))]), [[right[0]]], emptyMeta())
  );
});