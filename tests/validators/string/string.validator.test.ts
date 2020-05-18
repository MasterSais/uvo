import { V_STR as VALIDATOR_NAME } from '@lib/base-api/names';
import { string as validator } from '@lib/base-api/validators/string';
import { compile, template } from '@lib/templating-api/template';
import { baseCases, emptyMeta, errorMetaCase, notNullError, withErrorCases, compileWithErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCases(validator, [], right, wrong, String)
  );

  describe('base › compile', () =>
    baseCases(compile('@string'), [], right, wrong, String)
  );

  describe('base › compile › short', () =>
    baseCases(compile(`@s`), [], [right[0]], [wrong[0]], String)
  );

  describe('with error', () =>
    withErrorCases(validator(notNullError()), [[right[0]], [wrong[0]]], null, String)
  );

  describe('with meta', () =>
    withErrorCases(validator(errorMetaCase([], [], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta(), String)
  );

  describe('with error › compile', () =>
    compileWithErrorCases(compile('@string!0 ~e')([], [notNullError()]), [right[0], wrong[0]])
  );

  describe('with meta › template', () =>
    withErrorCases(template('@string!0')([], [errorMetaCase([], [], VALIDATOR_NAME)]), [[wrong[0]]], emptyMeta(), String)
  );
});