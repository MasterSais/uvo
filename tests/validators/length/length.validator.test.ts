import { V_LEN as VALIDATOR_NAME } from '@lib/base-api/names';
import { length as validator } from '@lib/base-api/validators/length';
import { template } from '@lib/templating-api/template';
import { baseCasesWithParams, emptyMeta, errorMetaCase, invertError, notNullError, withErrorCases } from '@test/utilities';
import { right, rightForNot, wrong, wrongForNot } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCasesWithParams(validator, right, wrong)
  );

  describe('base › not', () =>
    baseCasesWithParams(validator.not, rightForNot, wrongForNot)
  );

  describe('base › template', () =>
    baseCasesWithParams((...args) => template('@length(=$0)')(args), right, wrong)
  );

  describe('base › template › short', () =>
    baseCasesWithParams((...args) => template('@l(=$0)')(args), [right[0]], [wrong[0]])
  );

  describe('base › template › not', () =>
    baseCasesWithParams((...args) => template('@length(!=$0)')(args), rightForNot, wrongForNot)
  );

  describe('base › template › short › not', () =>
    baseCasesWithParams((...args) => template('@l(!=$0)')(args), [rightForNot[0]], [wrongForNot[0]])
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
    withErrorCases(template('@length(=$0)!0')([1], [notNullError()]), [[right[0][1]], [wrong[0][1]]])
  );

  describe('with meta › template', () =>
    withErrorCases(template('@length(=$0)!0')([1], [errorMetaCase([], [1], VALIDATOR_NAME)]), [[wrong[0][1]]], emptyMeta())
  );

  describe('with error › template › not', () =>
    withErrorCases(template('@length(!=$0)!0')([1], [notNullError()]), [[rightForNot[0][1]], [wrongForNot[0][1]]])
  );

  describe('with meta › template › not', () =>
    withErrorCases(template('@length(!=$0)!0')([1], [errorMetaCase([], [1], invertError(VALIDATOR_NAME, true))]), [[wrongForNot[0][1]]], emptyMeta())
  );
});