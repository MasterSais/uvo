import { V_MLP as VALIDATOR_NAME } from '@lib/names';
import { template } from '@lib/template/template';
import { multiple as validator } from '@lib/validators/multiple';
import { baseCasesWithParams, emptyMeta, errorMetaCase, invertError, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCasesWithParams(validator, right, wrong)
  );

  describe('base › not', () =>
    baseCasesWithParams(validator.not, [wrong[0]], [right[0]])
  );

  describe('base › template', () =>
    baseCasesWithParams((...args) => template('@compare(%$0)')()(args), right, wrong)
  );

  describe('base › template › short', () =>
    baseCasesWithParams((...args) => template('@c(%$0)')()(args), [right[0]], [wrong[0]])
  );

  describe('base › template › not', () =>
    baseCasesWithParams((...args) => template('@compare(!%$0)')()(args), [wrong[0]], [right[0]])
  );

  describe('base › template › short › not', () =>
    baseCasesWithParams((...args) => template('@c(!%$0)')()(args), [wrong[0]], [right[0]])
  );

  describe('with error', () =>
    withErrorCases(validator(1, notNullError()), [[right[0][1]], [wrong[0][1]]])
  );

  describe('with meta', () =>
    withErrorCases(validator(1, errorMetaCase([], [1], VALIDATOR_NAME)), [[wrong[0][1]]], emptyMeta())
  );

  describe('with error › not', () =>
    withErrorCases(validator.not(1, notNullError()), [[wrong[0][1]], [right[0][1]]])
  );

  describe('with meta › not', () =>
    withErrorCases(validator.not(1, errorMetaCase([], [1], invertError(VALIDATOR_NAME, true))), [[right[0][1]]], emptyMeta())
  );
});