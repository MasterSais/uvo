import { V_STR as VALIDATOR_NAME } from '@lib/base-api/names';
import { template, tml } from '@lib/templating-api/template';
import { string as validator } from '@lib/base-api/validators/string';
import { baseCases, emptyMeta, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCases(validator, [], right, wrong, String)
  );

  describe('base › template', () =>
    baseCases(template('@string'), [], right, wrong, String)
  );

  describe('base › template › short', () =>
    baseCases(tml`@s`, [], [right[0]], [wrong[0]], String)
  );

  describe('with error', () =>
    withErrorCases(validator(notNullError()), [[right[0]], [wrong[0]]], null, String)
  );

  describe('with meta', () =>
    withErrorCases(validator(errorMetaCase([], [], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta(), String)
  );

  describe('with error › template', () =>
    withErrorCases(template('@string!0')([], [notNullError()]), [[right[0]], [wrong[0]]], null, String)
  );

  describe('with meta › template', () =>
    withErrorCases(template('@string!0')([], [errorMetaCase([], [], VALIDATOR_NAME)]), [[wrong[0]]], emptyMeta(), String)
  );
});