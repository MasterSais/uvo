import { V_OOF as VALIDATOR_NAME } from '@lib/names';
import { oneOf as validator } from '@lib/validators/is';
import { baseCasesWithParams, emptyMeta, errorMetaCase, invertError, notNullError, paramsCases, withErrorCases } from '@test/utilities';
import { right, rightParams, wrong, wrongParams } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () =>
    paramsCases(validator, rightParams, wrongParams, VALIDATOR_NAME)
  );

  describe('base', () =>
    baseCasesWithParams(validator, right, wrong)
  );

  describe('base › not', () =>
    baseCasesWithParams(validator.not, [wrong[0]], [right[0]])
  );

  describe('with error', () =>
    withErrorCases(validator([1], notNullError()), [[right[0][1]], [wrong[0][1]]])
  );

  describe('with meta', () =>
    withErrorCases(validator([1], errorMetaCase([], [[1]], VALIDATOR_NAME)), [[wrong[0][1]]], emptyMeta())
  );

  describe('with error › not', () =>
    withErrorCases(validator.not([1], notNullError()), [[wrong[0][1]], [right[0][1]]])
  );

  describe('with meta › not', () =>
    withErrorCases(validator.not([1], errorMetaCase([], [[1]], invertError(VALIDATOR_NAME, true))), [[right[0][1]]], emptyMeta())
  );
});