import { V_INT as VALIDATOR_NAME } from '@lib/names';
import { integer as validator } from '@lib/validators/integer';
import { baseCases, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › not ${VALIDATOR_NAME}`, () => {
  describe('base', () => {
    baseCases<any>(
      validator.not(),
      [
        1.5, -1.5, 0.01, NaN, Infinity,
        '1', '-1', '1.5', 'abc', '1e3',
        true, false,
        null, undefined,
        emptyObject(),
        emptyFunction(),
        emptyArray()
      ],
      [
        0, -0, 1, -1, 1e3, -1e3, 0.00
      ]
    );
  });

  describe('with error', () => {
    withErrorCases(
      validator.not(notNullError()),
      [[null], [0]]
    );
  });

  describe('with meta', () => {
    withErrorCases(
      validator.not(errorMetaCase([], [], VALIDATOR_NAME)),
      [[0]],
      emptyMeta()
    );
  });
});