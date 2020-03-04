import { V_LEN as VALIDATOR_NAME } from '@lib/names';
import { len as validator } from '@lib/validators/len';
import { baseCases, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, paramsCases, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () => {
    paramsCases(
      validator,
      [
        [1],
        [1e3]
      ],
      [
        [-1],
        [NaN],
        [Infinity],
        ['1'],
        [true],
        [emptyObject()],
        [emptyArray()],
        [emptyFunction()],
        [null],
        [undefined]
      ],
      VALIDATOR_NAME
    );
  });

  describe('base', () => {
    baseCases<any>(
      validator(1),
      [
        [0], [''], [undefined],
        'a',
        { length: 1 }
      ],
      [
        1, Infinity, NaN,
        'abc',
        true,
        {}, { length: false }, { length: null }, { length: undefined },
        { length: Infinity }, { length: NaN }, { length: '1' }, { length: true },
        emptyFunction(),
        [], [0, 0],
        null, undefined
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator(1, notNullError()),
      [[[0]], [[]]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator(1, errorMetaCase([], [1], VALIDATOR_NAME)),
      [[[]]],
      emptyMeta()
    );
  });
});