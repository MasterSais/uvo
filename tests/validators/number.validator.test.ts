import { V_NUM as VALIDATOR_NAME } from '@lib/names';
import { template } from '@lib/template/template';
import { number as validator } from '@lib/validators/number';
import { baseCases, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  const rCases: any = [
    0, 2.2, -1.2,
    '0', '2.1', '2', '-2',
    true, false
  ];

  const wCases: any = [
    NaN, Infinity,
    '', '-', 'abc',
    null, undefined,
    emptyObject(),
    emptyFunction(),
    emptyArray(),
    [1, 2, 3]
  ];

  describe('base', () => {
    baseCases<any>(
      validator, [], rCases, wCases, Number
    );
  });

  describe('base › template', () => {
    baseCases<any>(
      template('@number')(), [], rCases, wCases, Number
    );
  });

  describe('with error', () => {
    withErrorCases(
      validator(notNullError()),
      [[0], [null]],
      null,
      Number
    );
  });

  describe('with meta', () => {
    withErrorCases(
      validator(errorMetaCase([], [], VALIDATOR_NAME)),
      [[null]],
      emptyMeta(),
      Number
    );
  });
});