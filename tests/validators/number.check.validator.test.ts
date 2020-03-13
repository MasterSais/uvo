import { V_NUM as VALIDATOR_NAME } from '@lib/names';
import { number as validator } from '@lib/validators/number';
import { baseCases, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () => {
    baseCases<any>(
      validator.check(),
      [
        0, 2.2, -1.2,
        '0', '2.1', '2', '-2',
        true, false
      ],
      [
        NaN, Infinity,
        '', '-', 'abc',
        null, undefined,
        emptyObject(),
        emptyFunction(),
        emptyArray(),
        [1, 2, 3]
      ]
    );
  });

  describe('with error', () => {
    withErrorCases(
      validator.check(notNullError()),
      [[0], [null]],
      null
    );
  });

  describe('with meta', () => {
    withErrorCases(
      validator.check(errorMetaCase([], [], VALIDATOR_NAME)),
      [[null]],
      emptyMeta()
    );
  });
});