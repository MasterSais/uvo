import { V_DEF as VALIDATOR_NAME } from '@lib/classic-api/names';
import { defined as validator } from '@lib/classic-api/validators/is';
import { template, tml } from '@lib/templating-api/template';
import { baseCases, emptyMeta, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCases(validator, [], right, wrong)
  );

  describe('base › template', () =>
    baseCases(template('@compare(=def)'), [], right, wrong)
  );

  describe('base › template › short', () =>
    baseCases(tml`@c(=def)`, [], [right[0]], [wrong[0]])
  );

  describe('with error', () =>
    withErrorCases(validator(notNullError()), [[right[0]], [wrong[0]]])
  );

  describe('with meta', () =>
    withErrorCases(validator(errorMetaCase([], [], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta())
  );

  describe('with error › template', () =>
    withErrorCases(template('@compare(=def)!0')([], [notNullError()]), [[right[0]], [wrong[0]]])
  );

  describe('with meta › template', () =>
    withErrorCases(template('@compare(=def)!0')([], [errorMetaCase([], [], VALIDATOR_NAME)]), [[wrong[0]]], emptyMeta())
  );
});