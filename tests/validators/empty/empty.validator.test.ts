import { V_EM as VALIDATOR_NAME } from '@lib/classic-api/names';
import { empty as validator } from '@lib/classic-api/validators/is';
import { baseCases, emptyMeta, errorMetaCase, invertError, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCases(validator, [], right, wrong)
  );

  describe('base › not', () =>
    baseCases(validator.not, [], [wrong[0]], [right[0]])
  );

  describe('with error', () =>
    withErrorCases(validator(notNullError()), [[right[0]], [wrong[0]]])
  );

  describe('with meta', () =>
    withErrorCases(validator(errorMetaCase([], [null, undefined, ''], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta())
  );

  describe('with error › not', () =>
    withErrorCases(validator.not(notNullError()), [[wrong[0]], [right[0]]])
  );

  describe('with meta › not', () =>
    withErrorCases(validator.not(errorMetaCase([], [null, undefined, ''], invertError(VALIDATOR_NAME, true))), [[right[0]]], emptyMeta())
  );
});