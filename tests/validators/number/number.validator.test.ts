import { V_NUM as VALIDATOR_NAME } from '@lib/base-api/names';
import { number as validator } from '@lib/base-api/validators/number';
import { compile, template } from '@lib/templating-api/template';
import { baseCases, compileWithErrorCases, emptyMeta, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCases(validator, [], right, wrong, Number)
  );

  describe('base › compile', () =>
    baseCases(compile('@number'), [], right, wrong, Number)
  );

  describe('base › compile › short', () =>
    baseCases(compile(`@n`), [], [right[0]], [wrong[0]], Number)
  );

  describe('with error', () =>
    withErrorCases(validator(notNullError()), [[right[0]], [wrong[0]]], null, Number)
  );

  describe('with meta', () =>
    withErrorCases(validator(errorMetaCase([], [], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta(), Number)
  );

  describe('with error › compile', () =>
    compileWithErrorCases(compile('@number!0 ~e')([], [notNullError()]), [right[0], wrong[0]])
  );

  describe('with meta › template', () =>
    withErrorCases(template('@number!0')([], [errorMetaCase([], [], VALIDATOR_NAME)]), [[wrong[0]]], emptyMeta())
  );
});