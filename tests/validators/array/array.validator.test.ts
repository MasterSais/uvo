import { V_ARR as VALIDATOR_NAME } from '@lib/base-api/names';
import { array as validator } from '@lib/base-api/validators/array';
import { compile } from '@lib/templating-api/template';
import { baseCases, baseCasesWithParams, compileWithErrorCases, emptyMeta, errorMetaCase, notNullError, paramsCases, withErrorCases } from '@test/utilities';
import { right, rightParams, rightTemplate, wrong, wrongParams, wrongTemplate } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () =>
    paramsCases(validator, rightParams, wrongParams, VALIDATOR_NAME)
  );

  describe('base', () =>
    baseCasesWithParams(validator, right, wrong)
  );

  describe('base › compile', () =>
    baseCases(compile('@array'), [], rightTemplate, wrongTemplate)
  );

  describe('base › compile › short', () =>
    baseCases(compile(`@a`), [], [rightTemplate[0]], [wrongTemplate[0]])
  );

  describe('with error', () =>
    withErrorCases(validator(null, notNullError()), [[right[0][1]], [wrong[0][1]]])
  );

  describe('with meta', () =>
    withErrorCases(validator(null, errorMetaCase([], [], VALIDATOR_NAME)), [[wrong[0][1]]], emptyMeta())
  );

  describe('with error › compile', () =>
    compileWithErrorCases(compile('@array!0 ~e')([], [notNullError()]), [right[0][1], wrong[0][1]])
  );

  describe('with meta › compile', () =>
    compileWithErrorCases(compile('@array!0 ~e ~m')([], [errorMetaCase([], [], VALIDATOR_NAME)]), [right[0][1], wrong[0][1]])
  );
});