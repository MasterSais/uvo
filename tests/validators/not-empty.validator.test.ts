import { V_EM as VALIDATOR_NAME } from '@lib/names';
import { empty as validator } from '@lib/validators/empty';
import { baseCases, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › not ${VALIDATOR_NAME}`, () => {
  describe('base', () => {
    baseCases<any>(
      validator.not(),
      [
        1.5, -1.5, 0.01, NaN, Infinity,
        '1', '-1', '1.5', 'abc', '1e3',
        true, false,
        emptyObject(),
        emptyFunction(),
        emptyArray()
      ],
      [
        '', null, undefined
      ]
    );
  });

  describe('with error', () => {
    withErrorCases(
      validator.not(notNullError()),
      [[0], [null]]
    );
  });

  describe('with meta', () => {
    withErrorCases(
      validator.not(errorMetaCase([], [], VALIDATOR_NAME)),
      [[null]],
      emptyMeta()
    );
  });
});