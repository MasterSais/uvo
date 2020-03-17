import { V_REG as VALIDATOR_NAME } from '@lib/names';
import { regex as validator } from '@lib/validators/is';
import { baseCases, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, invertError, notNullError, paramsCases, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () => {
    paramsCases(
      validator,
      [
        [/1/],
        [/a/],
        [new RegExp('a')]
      ],
      [
        [1],
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
      validator, [/^(a|1|true)$/],
      [
        1, true, 'a'
      ],
      [
        0, 11, Infinity, NaN,
        'abc',
        false,
        {},
        emptyFunction(),
        [],
        null, undefined
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator(/a|1|true/, notNullError()),
      [[1], [0]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator(/a|1|true/, errorMetaCase([], [/a|1|true/], VALIDATOR_NAME)),
      [[0]],
      emptyMeta()
    );
  });

  describe('with error › not', () => {
    withErrorCases<any>(
      validator.not(/a|1|true/, notNullError()),
      [[0], [1]]
    );
  });

  describe('with meta › not', () => {
    withErrorCases<any>(
      validator.not(/a|1|true/, errorMetaCase([], [/a|1|true/], invertError(VALIDATOR_NAME, true))),
      [[1]],
      emptyMeta()
    );
  });
});