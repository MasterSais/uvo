import { V_LEN as VALIDATOR_NAME } from '@lib/names';
import { length as validator, maxLen, minLen } from '@lib/validators/length';
import { baseCases, baseCasesWithParams, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, paramsCases, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () => {
    paramsCases(
      validator,
      [
        [1],
        [1e3],
        [1e3, 'equal'],
        [1e3, 'gte'],
        [1e3, 'lte']
      ],
      [
        [-1],
        [1, 'lt'],
        [1, 'gt'],
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
        [[1], { length: 1 }],
        [[1, 'gte'], [0]],
        [[1, 'gte'], [0, 0]],
        [[1, 'gte'], ['0']],
        [[1, 'gte'], 'a'],
        [[1, 'gte'], 'abc'],
        [[1, 'gte'], { length: 1 }],
        [[1, 'gte'], { length: 10 }],
        [[1, 'lte'], [0]],
        [[1, 'lte'], []],
        [[1, 'lte'], ['0']],
        [[1, 'lte'], 'a'],
        [[1, 'lte'], ''],
        [[1, 'lte'], { length: 1 }],
        [[1, 'lte'], { length: 0 }]
      ],
      [
        [[1], 1],
        [[1], Infinity],
        [[1], NaN],
        [[1], 'abc'],
        [[1], true],
        [[1], { length: '1' }],
        [[1], [0, 0]],
        [[1, 'gte'], []],
        [[1, 'lte'], [0, 0]]
      ]
    );
  });

  describe('base › minLen', () => {
    baseCases<any>(
      minLen(1),
      [
        [0],
        [0, 0],
        ['0'],
        'a',
        'abc',
        { length: 1 },
        { length: 10 }
      ],
      [
        1,
        Infinity,
        NaN,
        '',
        true,
        { length: '1' },
        []
      ]
    );
  });

  describe('base › maxLen', () => {
    baseCases<any>(
      maxLen(1),
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
      validator(1, 'equal', notNullError()),
      [[[0]], [[]]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator(1, 'equal', errorMetaCase([], [1, 'equal'], VALIDATOR_NAME)),
      [[[]]],
      emptyMeta()
    );
  });

  describe('with error › minLen', () => {
    withErrorCases<any>(
      minLen(1, notNullError()),
      [[[0]], [[]]]
    );
  });

  describe('with meta › minLen', () => {
    withErrorCases<any>(
      minLen(1, errorMetaCase([], [1, 'gte'], VALIDATOR_NAME)),
      [[[]]],
      emptyMeta()
    );
  });

  describe('with error › maxLen', () => {
    withErrorCases<any>(
      maxLen(1, notNullError()),
      [[[0]], [[0, 0]]]
    );
  });

  describe('with meta › maxLen', () => {
    withErrorCases<any>(
      maxLen(1, errorMetaCase([], [1, 'lte'], VALIDATOR_NAME)),
      [[[0, 0]]],
      emptyMeta()
    );
  });
});