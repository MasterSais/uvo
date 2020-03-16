import { V_LEN as VALIDATOR_NAME } from '@lib/names';
import { invertError } from '@lib/utilities';
import { length as validator, maxLen, minLen } from '@lib/validators/is';
import { baseCases, baseCasesWithParams, emptyFunction, emptyMeta, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${invertError(VALIDATOR_NAME, true)}`, () => {
  describe('base', () => {
    baseCases<any>(
      validator.not(1),
      [
        1, Infinity, NaN,
        'abc',
        true,
        {}, { length: false }, { length: null }, { length: undefined },
        { length: Infinity }, { length: NaN }, { length: '1' }, { length: true },
        emptyFunction(),
        [], [0, 0],
        null, undefined
      ],
      [
        [0], [''], [undefined],
        'a',
        { length: 1 }
      ]
    );
  });

  describe('base', () => {
    baseCasesWithParams<any>(
      validator.not,
      [
        [[1], 1],
        [[1], Infinity],
        [[1], NaN],
        [[1], 'abc'],
        [[1], true],
        [[1], { length: '1' }],
        [[1], [0, 0]]
      ],
      [
        [[1], [0]],
        [[1], ['0']],
        [[1], 'a'],
        [[1], { length: 1 }]
      ]
    );
  });

  describe('base › minLen', () => {
    baseCases<any>(
      minLen.not(1),
      [
        1,
        Infinity,
        NaN,
        '',
        true,
        { length: '1' },
        []
      ],
      [
        [0],
        [0, 0],
        ['0'],
        'a',
        'abc',
        { length: 1 },
        { length: 10 }
      ]
    );
  });

  describe('base › maxLen', () => {
    baseCases<any>(
      maxLen.not(1),
      [
        1,
        Infinity,
        NaN,
        'abc',
        true,
        { length: '1' },
        [0, 0]
      ],
      [
        [0],
        [],
        ['0'],
        'a',
        '',
        { length: 1 },
        { length: 0 }
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator.not(1, notNullError()),
      [[[]], [[0]]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator.not(1, errorMetaCase([], [1], invertError(VALIDATOR_NAME, true))),
      [[[0]]],
      emptyMeta()
    );
  });

  describe('with error › minLen', () => {
    withErrorCases<any>(
      minLen.not(1, notNullError()),
      [[[]], [[0]]]
    );
  });

  describe('with meta › minLen', () => {
    withErrorCases<any>(
      minLen.not(1, errorMetaCase([], [1], invertError(VALIDATOR_NAME, true))),
      [[[0]]],
      emptyMeta()
    );
  });

  describe('with error › maxLen', () => {
    withErrorCases<any>(
      maxLen.not(1, notNullError()),
      [[[0, 0]], [[0]]]
    );
  });

  describe('with meta › maxLen', () => {
    withErrorCases<any>(
      maxLen.not(1, errorMetaCase([], [1], invertError(VALIDATOR_NAME, true))),
      [[[0]]],
      emptyMeta()
    );
  });
});