import { V_MLP as VALIDATOR_NAME, V_CMP } from '@lib/base-api/names';
import { multiple as validator } from '@lib/base-api/validators/multiple';
import { compile } from '@lib/templating-api/template';
import { baseCasesWithParams, compileWithErrorCases, emptyMeta, errorMetaCase, invertError, notNullError, withErrorCases } from '@test/utilities';
import { right, rightForNot, wrong, wrongForNot } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCasesWithParams(validator, right, wrong)
  );

  describe('base › not', () =>
    baseCasesWithParams(validator.not, rightForNot, wrongForNot)
  );

  describe('base › compile', () =>
    baseCasesWithParams((...args) => compile('@compare(%$0)')(args), right, wrong)
  );

  describe('base › compile › short', () =>
    baseCasesWithParams((...args) => compile('@c(%$0)')(args), [right[0]], [wrong[0]])
  );

  describe('base › compile › not', () =>
    baseCasesWithParams((...args) => compile('@compare(!%$0)')(args), rightForNot, wrongForNot)
  );

  describe('base › compile › short › not', () =>
    baseCasesWithParams((...args) => compile('@c(!%$0)')(args), [rightForNot[0]], [wrongForNot[0]])
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

  describe('with error › compile', () =>
    compileWithErrorCases(compile('@compare(%1)!0 ~e')([], [notNullError()]), [right[0][1], wrong[0][1]])
  );

  describe('with meta › compile', () =>
    compileWithErrorCases(compile('@compare(%1)!0 ~e ~m')([], [errorMetaCase([], ['%', 1], V_CMP)]), [right[0][1], wrong[0][1]])
  );

  describe('with error › compile › not', () =>
    compileWithErrorCases(compile('@compare(!%1)!0 ~e')([], [notNullError()]), [rightForNot[0][1], wrongForNot[0][1]])
  );

  describe('with meta › compile › not', () =>
    compileWithErrorCases(compile('@compare(!%1)!0 ~e ~m')([], [errorMetaCase([], ['!%', 1], V_CMP)]), [rightForNot[0][1], wrongForNot[0][1]])
  );
});