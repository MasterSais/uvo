import { V_EM as VALIDATOR_NAME } from '@lib/names';
import { empty as validator } from '@lib/validators/empty';
import { baseCases, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () => {
    baseCases<any>(
      validator(),
      [
        '', null, undefined
      ],
      [
        1.5, -1.5, 0.01, NaN, Infinity,
        '1', '-1', '1.5', 'abc', '1e3',
        true, false,
        emptyObject(),
        emptyFunction(),
        emptyArray()
      ]
    );
  });

  describe('with error', () => {
    withErrorCases(
      validator(notNullError()),
      [[null], [0]]
    );
  });

  describe('with meta', () => {
    withErrorCases(
      validator(errorMetaCase([], [], VALIDATOR_NAME)),
      [[0]],
      emptyMeta()
    );
  });
});