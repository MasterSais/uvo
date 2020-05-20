import { V_DEF as VALIDATOR_NAME } from '@lib/base-api/names';
import { defined as validator } from '@lib/base-api/validators/is';
import { compile } from '@lib/templating-api/template';
import { baseCases, compileWithErrorCases, emptyMeta, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCases(validator, [], right, wrong)
  );

  describe('base › compile', () =>
    baseCases(compile('@compare(=def)'), [], right, wrong)
  );

  describe('base › compile › short', () =>
    baseCases(compile(`@c(=def)`), [], [right[0]], [wrong[0]])
  );

  describe('with error', () =>
    withErrorCases(validator(notNullError()), [[right[0]], [wrong[0]]])
  );

  describe('with meta', () =>
    withErrorCases(validator(errorMetaCase([], [], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta())
  );

  describe('with error › compile', () =>
    compileWithErrorCases(compile('@compare(=def)!0 ~e')([], [notNullError()]), [right[0], wrong[0]])
  );

  // describe('with meta › template', () =>
  //   withErrorCases(template('@compare(=def)!0')([], [errorMetaCase([], [], VALIDATOR_NAME)]), [[wrong[0]]], emptyMeta())
  // );
});