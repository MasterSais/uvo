import { V_NEM as VALIDATOR_NAME } from '@lib/names';
import { notEmpty as validator } from '@lib/validators/not-empty';
import { baseCases, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () => {
    baseCases<any>(
      validator(),
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
      validator(notNullError()),
      [[0], [null]]
    );
  });

  describe('with meta', () => {
    withErrorCases(
      validator(errorMetaCase([], [], VALIDATOR_NAME)),
      [[null]],
      emptyMeta()
    );
  });
});