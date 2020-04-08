
import { V_INT as VALIDATOR_NAME, V_MLP } from '@lib/classic-api/names';
import { template } from '@lib/templating-api/template';
import { integer as validator } from '@lib/classic-api/validators/multiple';
import { baseCases, emptyMeta, errorMetaCase, invertError, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCases(validator, [], right, wrong)
  );

  describe('base › not', () =>
    baseCases(validator.not, [], wrong, right)
  );

  describe('base › template', () =>
    baseCases(template('@compare(%1)'), [], right, wrong)
  );

  describe('base › template › short', () =>
    baseCases(template('@c(%1)'), [], [right[0]], [wrong[0]])
  );

  describe('base › template › not', () =>
    baseCases(template('@compare(!%1)'), [], wrong, right)
  );

  describe('base › template › short › not', () =>
    baseCases(template('@c(!%1)'), [], [wrong[0]], [right[0]])
  );

  describe('with error', () =>
    withErrorCases(validator(notNullError()), [[right[0]], [wrong[0]]])
  );

  describe('with meta', () =>
    withErrorCases(validator(errorMetaCase([], [1], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta())
  );

  describe('with error › not', () =>
    withErrorCases(validator.not(notNullError()), [[wrong[0]], [right[0]]])
  );

  describe('with meta › not', () =>
    withErrorCases(validator.not(errorMetaCase([], [1], invertError(VALIDATOR_NAME, true))), [[right[0]]], emptyMeta())
  );

  describe('with error › template', () =>
    withErrorCases(template('@compare(%1)!0')([], [notNullError()]), [[right[0]], [wrong[0]]])
  );

  describe('with meta › template', () =>
    withErrorCases(template('@compare(%1)!0')([], [errorMetaCase([], [1], V_MLP)]), [[wrong[0]]], emptyMeta())
  );

  describe('with error › template › not', () =>
    withErrorCases(template('@compare(!%1)!0')([], [notNullError()]), [[wrong[0]], [right[0]]])
  );

  describe('with meta › template › not', () =>
    withErrorCases(template('@compare(!%1)!0')([], [errorMetaCase([], [1], invertError(V_MLP, true))]), [[right[0]]], emptyMeta())
  );
});