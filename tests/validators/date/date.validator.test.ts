import { V_DTE as VALIDATOR_NAME } from '@lib/base-api/names';
import { date as validator } from '@lib/base-api/validators/date';
import { compile } from '@lib/templating-api/template';
import { baseCases, compileWithErrorCases, emptyMeta, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

const toDate = (value: any) => new Date(value).getTime();

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCases(validator, [], right, wrong, toDate)
  );

  describe('base › compile', () =>
    baseCases(compile('@date'), [], right, wrong, toDate)
  );

  describe('base › compile › short', () =>
    baseCases(compile(`@d`), [], [right[0]], [wrong[0]], toDate)
  );

  describe('with error', () =>
    withErrorCases(validator(notNullError()), [[right[0]], [wrong[0]]], null, toDate)
  );

  describe('with meta', () =>
    withErrorCases(validator(errorMetaCase([], [], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta(), toDate)
  );

  describe('with error › compile', () =>
    compileWithErrorCases(compile('@date!0 ~e')([], [notNullError()]), [right[0], wrong[0]])
  );

  describe('with meta › compile', () =>
    compileWithErrorCases(compile('@date!0 ~e ~m')([], [errorMetaCase([], [], VALIDATOR_NAME)]), [right[0], wrong[0]])
  );
});