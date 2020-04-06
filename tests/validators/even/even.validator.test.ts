import { V_EVN as VALIDATOR_NAME, V_MLP } from '@lib/names';
import { template } from '@lib/template/template';
import { even as validator } from '@lib/validators/multiple';
import { baseCases, emptyMeta, errorMetaCase, invertError, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCases(validator, [], right, wrong)
  );

  describe('base › not', () =>
    baseCases(validator.not, [], [wrong[0]], [right[0]])
  );

  describe('base › template', () =>
    baseCases(template('@compare(%2)'), [], right, wrong)
  );

  describe('base › template › short', () =>
    baseCases(template('@c(%2)'), [], [right[0]], [wrong[0]])
  );

  describe('base › template › not', () =>
    baseCases(template('@compare(!%2)'), [], [wrong[0]], [right[0]])
  );

  describe('base › template › short › not', () =>
    baseCases(template('@c(!%2)'), [], [wrong[0]], [right[0]])
  );

  describe('with error', () =>
    withErrorCases(validator(notNullError()), [[right[0]], [wrong[0]]])
  );

  describe('with meta', () =>
    withErrorCases(validator(errorMetaCase([], [2], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta())
  );

  describe('with error › not', () =>
    withErrorCases(validator.not(notNullError()), [[wrong[0]], [right[0]]])
  );

  describe('with meta › not', () =>
    withErrorCases(validator.not(errorMetaCase([], [2], invertError(VALIDATOR_NAME, true))), [[right[0]]], emptyMeta())
  );

  describe('with error › template', () =>
    withErrorCases(template('@compare(%2)!0')([], [notNullError()]), [[right[0]], [wrong[0]]])
  );

  describe('with meta › template', () =>
    withErrorCases(template('@compare(%2)!0')([], [errorMetaCase([], [2], V_MLP)]), [[wrong[0]]], emptyMeta())
  );

  describe('with error › template › not', () =>
    withErrorCases(template('@compare(!%2)!0')([], [notNullError()]), [[wrong[0]], [right[0]]])
  );

  describe('with meta › template › not', () =>
    withErrorCases(template('@compare(!%2)!0')([], [errorMetaCase([], [2], invertError(V_MLP, true))]), [[right[0]]], emptyMeta())
  );
});