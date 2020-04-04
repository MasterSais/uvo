import { V_STR as VALIDATOR_NAME } from '@lib/names';
import { template } from '@lib/template/template';
import { string as validator } from '@lib/validators/string';
import { baseCases, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  const rCases: any = [
    0, 2.2, -1.2, NaN, Infinity,
    '', '2', 'abc',
    true, false
  ];

  const wCases: any = [
    null, undefined,
    emptyObject(),
    emptyFunction(),
    emptyArray()
  ];

  describe('base', () => {
    baseCases<any>(
      validator, [], rCases, wCases, String
    );
  });

  describe('base › template', () => {
    baseCases<any>(
      template('@string')(), [], rCases, wCases, String
    );
  });

  describe('with error', () => {
    withErrorCases(
      validator(notNullError()),
      [[0], [null]],
      null,
      String
    );
  });

  describe('with meta', () => {
    withErrorCases(
      validator(errorMetaCase([], [], VALIDATOR_NAME)),
      [[null]],
      emptyMeta(),
      String
    );
  });
});