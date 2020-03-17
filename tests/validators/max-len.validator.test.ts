import { V_MXLEN as VALIDATOR_NAME } from '@lib/names';
import { invertError } from '@lib/utilities';
import { maxLen as validator } from '@lib/validators/length';
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
      validator, [1],
      [
        [0],
        [],
        ['0'],
        'a',
        '',
        { length: 1 },
        { length: 0 }
      ],
      [
        1,
        Infinity,
        NaN,
        'abc',
        true,
        { length: '1' },
        [0, 0]
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator(1, notNullError()),
      [[[0]], [[0, 0]]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator(1, errorMetaCase([], [1], VALIDATOR_NAME)),
      [[[0, 0]]],
      emptyMeta()
    );
  });

  describe('with error › not', () => {
    withErrorCases<any>(
      validator.not(1, notNullError()),
      [[[0, 0]], [[0]]]
    );
  });

  describe('with meta › not', () => {
    withErrorCases<any>(
      validator.not(1, errorMetaCase([], [1], invertError(VALIDATOR_NAME, true))),
      [[[0]]],
      emptyMeta()
    );
  });
});