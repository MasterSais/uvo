import { V_OOF as VALIDATOR_NAME } from '@lib/classic-api/names';
import { oneOf as validator } from '@lib/classic-api/validators/is';
import { template } from '@lib/templating-api/template';
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
    baseCasesWithParams(validator.not, wrong, right)
  );

  describe('base › template', () =>
    baseCasesWithParams((...args) => template('@compare(->$0)')(args), right, wrong)
  );

  describe('base › template › not', () =>
    baseCasesWithParams((...args) => template('@compare(!->$0)')(args), wrong, right)
  );

  describe('base › template › short', () =>
    baseCasesWithParams((...args) => template('@c(->$0)')(args), [right[0]], [wrong[0]])
  );

  describe('base › template › short › not', () =>
    baseCasesWithParams((...args) => template('@c(!->$0)')(args), [wrong[0]], [right[0]])
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

  describe('with error › template', () =>
    withErrorCases(template('@compare(->$0)!0')([[1]], [notNullError()]), [[right[0][1]], [wrong[0][1]]])
  );

  describe('with meta › template', () =>
    withErrorCases(template('@compare(->$0)!0')([[1]], [errorMetaCase([], [[1]], VALIDATOR_NAME)]), [[wrong[0][1]]], emptyMeta())
  );

  describe('with error › template › not', () =>
    withErrorCases(template('@compare(!->$0)!0')([[1]], [notNullError()]), [[wrong[0][1]], [right[0][1]]])
  );

  describe('with meta › template › not', () =>
    withErrorCases(template('@compare(!->$0)!0')([[1]], [errorMetaCase([], [[1]], invertError(VALIDATOR_NAME, true))]), [[right[0][1]]], emptyMeta())
  );
});