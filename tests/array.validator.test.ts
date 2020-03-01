import { V_ARR as VALIDATOR_NAME } from '@lib/names';
import { array as validator } from '@lib/validators/array';
import { gte } from '@lib/validators/gte';
import { integer } from '@lib/validators/integer';
import { baseCasesWithParams, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, paramsCases, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () => {
    paramsCases(
      validator,
      [
        [],
        [0],
        [undefined],
        [null],
        [false],
        [emptyArray()],
        [emptyFunction()],
        [[emptyFunction()]],
        [[emptyFunction(), emptyFunction()]]
      ],
      [
        [1],
        [[1]],
        ['1'],
        [['1']],
        [true],
        [[true]],
        [[false]],
        [emptyObject()],
        [[1, emptyFunction()]],
        [[emptyFunction(), emptyFunction(), null]],
        [[emptyFunction(), emptyFunction(), undefined]]
      ],
      VALIDATOR_NAME
    );
  });

  describe('base', () => {
    baseCasesWithParams<any>(
      validator,
      [
        [[null], []],
        [[undefined], []],
        [[false], []],
        [[], []],
        [[[]], []],
        [[], [1, 2]],
        [[], [null, '2']],
        [[[integer()]], []],
        [[[integer()]], [1, 1]],
        [[[integer()]], [1, 1.2], [1, null]],
        [[[integer()]], [1, '1'], [1, null]],
        [[[integer()]], [false, '1'], [null, null]],
        [[[integer(), gte(0)]], []],
        [[[integer(), gte(0)]], [1, 1]],
        [[[integer(), gte(0)]], [1, -1], [1, null]],
        [[[integer(), gte(0)]], [NaN, -1], [null, null]],
        [[[integer(), gte(0)]], [Infinity, -Infinity], [null, null]],
        [[[integer(), gte(0)]], [10, 10.2], [10, null]]
      ],
      [
        [[], 1],
        [[], 'abc'],
        [[], false],
        [[], null],
        [[], undefined],
        [[], emptyFunction()],
        [[], emptyObject()],
        [[[integer(), gte(0)]], false]
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator(null, notNullError()),
      [[[]], [null]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator(null, errorMetaCase([], [null], VALIDATOR_NAME)),
      [[null]],
      emptyMeta()
    );
  });
});