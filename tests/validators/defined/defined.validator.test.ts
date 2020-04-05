import { V_DEF as VALIDATOR_NAME } from '@lib/names';
import { defined as validator } from '@lib/validators/is';
import { baseCases, emptyMeta, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCases(validator, [], right, wrong)
  );

  // describe('base › template', () =>
  //   baseCases(template('@string'), [], right, wrong)
  // );

  // describe('base › template › short', () =>
  //   baseCases(tml`@s`, [], [right[0]], [wrong[0]])
  // );

  describe('with error', () =>
    withErrorCases(validator(notNullError()), [[right[0]], [wrong[0]]])
  );

  describe('with meta', () =>
    withErrorCases(validator(errorMetaCase([], [], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta())
  );
});