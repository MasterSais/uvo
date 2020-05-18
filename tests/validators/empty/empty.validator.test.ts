import { V_EM as VALIDATOR_NAME } from '@lib/base-api/names';
import { empty as validator } from '@lib/base-api/validators/is';
import { compile, template } from '@lib/templating-api/template';
import { baseCases, compileWithErrorCases, emptyMeta, errorMetaCase, invertError, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCases(validator, [], right, wrong)
  );

  describe('base › not', () =>
    baseCases(validator.not, [], wrong, right)
  );

  describe('base › compile', () =>
    baseCases(compile('@compare(=emp)'), [], right, wrong)
  );

  describe('base › compile › not', () =>
    baseCases(compile('@compare(!=emp)'), [], wrong, right)
  );

  describe('base › compile › short', () =>
    baseCases(compile(`@c(=emp)`), [], [right[0]], [wrong[0]])
  );

  describe('with error', () =>
    withErrorCases(validator(notNullError()), [[right[0]], [wrong[0]]])
  );

  describe('with meta', () =>
    withErrorCases(validator(errorMetaCase([], [[null, undefined, '']], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta())
  );

  describe('with error › not', () =>
    withErrorCases(validator.not(notNullError()), [[wrong[0]], [right[0]]])
  );

  describe('with meta › not', () =>
    withErrorCases(validator.not(errorMetaCase([], [[null, undefined, '']], invertError(VALIDATOR_NAME, true))), [[right[0]]], emptyMeta())
  );

  describe('with error › compile', () =>
    compileWithErrorCases(compile('@compare(=emp)!0 ~e')([], [notNullError()]), [right[0], wrong[0]])
  );

  describe('with meta › template', () =>
    withErrorCases(template('@compare(=emp)!0')([], [errorMetaCase([], [[null, undefined, '']], VALIDATOR_NAME)]), [[wrong[0]]], emptyMeta())
  );

  describe('with error › compile › not', () =>
    compileWithErrorCases(compile('@compare(!=emp)!0 ~e')([], [notNullError()]), [wrong[0], right[0]])
  );

  describe('with meta › template › not', () =>
    withErrorCases(template('@compare(!=emp)!0')([], [errorMetaCase([], [[null, undefined, '']], invertError(VALIDATOR_NAME, true))]), [[right[0]]], emptyMeta())
  );
});