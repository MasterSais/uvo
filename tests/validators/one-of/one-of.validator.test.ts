import { V_OOF as VALIDATOR_NAME, V_CMP } from '@lib/base-api/names';
import { oneOf as validator } from '@lib/base-api/validators/is';
import { compile } from '@lib/templating-api/template';
import { baseCasesWithParams, compileWithErrorCases, emptyMeta, errorMetaCase, invertError, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCasesWithParams(validator, right, wrong)
  );

  describe('base › not', () =>
    baseCasesWithParams(validator.not, wrong, right)
  );

  describe('base › compile', () =>
    baseCasesWithParams((...args) => compile('@compare(->$0)')(args), right, wrong)
  );

  describe('base › compile › not', () =>
    baseCasesWithParams((...args) => compile('@compare(!->$0)')(args), wrong, right)
  );

  describe('base › compile › short', () =>
    baseCasesWithParams((...args) => compile('@c(->$0)')(args), [right[0]], [wrong[0]])
  );

  describe('base › compile › short › not', () =>
    baseCasesWithParams((...args) => compile('@c(!->$0)')(args), [wrong[0]], [right[0]])
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

  describe('with error › compile', () =>
    compileWithErrorCases(compile('@compare(->$0)!0 ~e')([[1]], [notNullError()]), [right[0][1], wrong[0][1]])
  );

  describe('with meta › compile', () =>
    compileWithErrorCases(compile('@compare(->$0)!0 ~e ~m')([[1]], [errorMetaCase([], ['->', [1]], V_CMP)]), [right[0][1], wrong[0][1]])
  );

  describe('with error › compile › not', () =>
    compileWithErrorCases(compile('@compare(!->$0)!0 ~e')([[1]], [notNullError()]), [wrong[0][1], right[0][1]])
  );

  describe('with meta › compile › not', () =>
    compileWithErrorCases(compile('@compare(!->$0)!0 ~e ~m')([[1]], [errorMetaCase([], ['!->', [1]], V_CMP)]), [wrong[0][1], right[0][1]])
  );
});