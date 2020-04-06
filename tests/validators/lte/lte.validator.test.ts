import { V_LTE as VALIDATOR_NAME } from '@lib/names';
import { template } from '@lib/template/template';
import { lte as validator } from '@lib/validators/is';
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
    baseCasesWithParams((...args) => template('@compare(<=$0)')(args), right, wrong)
  );

  describe('base › template › short', () =>
    baseCasesWithParams((...args) => template('@c(<=$0)')(args), [right[0]], [wrong[0]])
  );

  describe('base › template › not', () =>
    baseCasesWithParams((...args) => template('@compare(>$0)')(args), [wrong[0]], [right[0]])
  );

  describe('base › template › short › not', () =>
    baseCasesWithParams((...args) => template('@c(>$0)')(args), [wrong[0]], [right[0]])
  );

  describe('with error', () =>
    withErrorCases(validator(0, notNullError()), [[right[0][1]], [wrong[0][1]]])
  );

  describe('with meta', () =>
    withErrorCases(validator(0, errorMetaCase([], [0], VALIDATOR_NAME)), [[wrong[0][1]]], emptyMeta())
  );

  describe('with error › not', () =>
    withErrorCases(validator.not(0, notNullError()), [[wrong[0][1]], [right[0][1]]])
  );

  describe('with meta › not', () =>
    withErrorCases(validator.not(0, errorMetaCase([], [0], invertError(VALIDATOR_NAME, true))), [[right[0][1]]], emptyMeta())
  );

  describe('with error › template', () =>
    withErrorCases(template('@compare(<=$0)!0')([0], [notNullError()]), [[right[0][1]], [wrong[0][1]]])
  );

  describe('with meta › template', () =>
    withErrorCases(template('@compare(<=$0)!0')([0], [errorMetaCase([], [0], VALIDATOR_NAME)]), [[wrong[0][1]]], emptyMeta())
  );

  describe('with error › template › not', () =>
    withErrorCases(template('@compare(>$0)!0')([0], [notNullError()]), [[wrong[0][1]], [right[0][1]]])
  );

  describe('with meta › template › not', () =>
    withErrorCases(template('@compare(>$0)!0')([0], [errorMetaCase([], [0], invertError(VALIDATOR_NAME, true))]), [[right[0][1]]], emptyMeta())
  );
});