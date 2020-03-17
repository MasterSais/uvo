import { V_LEN as VALIDATOR_NAME } from '@lib/names';
import { length as validator } from '@lib/validators/length';
import { baseCasesWithParams, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, invertError, notNullError, paramsCases, withErrorCases } from '@test/utilities';

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
    baseCasesWithParams<any>(
      validator,
      [
        [[1], [0]],
        [[1], ['0']],
        [[1], 'a'],
        [[1], { length: 1 }]
      ],
      [
        [[1], 1],
        [[1], Infinity],
        [[1], NaN],
        [[1], 'abc'],
        [[1], true],
        [[1], { length: '1' }],
        [[1], [0, 0]]
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

  describe('with error › not', () => {
    withErrorCases<any>(
      validator.not(1, notNullError()),
      [[[]], [[0]]]
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