import { V_MLP as VALIDATOR_NAME } from '@lib/base-api/names';
import { template } from '@lib/templating-api/template';
import { multiple as validator } from '@lib/base-api/validators/multiple';
import { baseCasesWithParams, emptyMeta, errorMetaCase, invertError, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong, rightForNot, wrongForNot } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCasesWithParams(validator, right, wrong)
  );

  describe('base › not', () =>
    baseCasesWithParams(validator.not, rightForNot, wrongForNot)
  );

  describe('base › template', () =>
    baseCasesWithParams((...args) => template('@compare(%$0)')(args), right, wrong)
  );

  describe('base › template › short', () =>
    baseCasesWithParams((...args) => template('@c(%$0)')(args), [right[0]], [wrong[0]])
  );

  describe('base › template › not', () =>
    baseCasesWithParams((...args) => template('@compare(!%$0)')(args), rightForNot, wrongForNot)
  );

  describe('base › template › short › not', () =>
    baseCasesWithParams((...args) => template('@c(!%$0)')(args), [rightForNot[0]], [wrongForNot[0]])
  );

  describe('with error', () =>
    withErrorCases(validator(1, notNullError()), [[right[0][1]], [wrong[0][1]]])
  );

  describe('with meta', () =>
    withErrorCases(validator(1, errorMetaCase([], [1], VALIDATOR_NAME)), [[wrong[0][1]]], emptyMeta())
  );

  describe('with error › not', () =>
    withErrorCases(validator.not(1, notNullError()), [[rightForNot[0][1]], [wrongForNot[0][1]]])
  );

  describe('with meta › not', () =>
    withErrorCases(validator.not(1, errorMetaCase([], [1], invertError(VALIDATOR_NAME, true))), [[wrongForNot[0][1]]], emptyMeta())
  );

  describe('with error › template', () =>
    withErrorCases(template('@compare(%1)!0')([], [notNullError()]), [[right[0][1]], [wrong[0][1]]])
  );

  describe('with meta › template', () =>
    withErrorCases(template('@compare(%1)!0')([], [errorMetaCase([], [1], VALIDATOR_NAME)]), [[wrong[0][1]]], emptyMeta())
  );

  describe('with error › template › not', () =>
    withErrorCases(template('@compare(!%1)!0')([], [notNullError()]), [[rightForNot[0][1]], [wrongForNot[0][1]]])
  );

  describe('with meta › template › not', () =>
    withErrorCases(template('@compare(!%1)!0')([], [errorMetaCase([], [1], invertError(VALIDATOR_NAME, true))]), [[wrongForNot[0][1]]], emptyMeta())
  );
});