import { V_LTE as VALIDATOR_NAME } from '@lib/names';
import { lte as validator } from '@lib/validators/lte';
import { baseCasesWithParams, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, paramsCases, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () => {
    paramsCases(
      validator,
      [
        [1],
        [-1],
        ['1'],
        ['-1'],
        [true],
        [false]
      ],
      [
        [emptyObject()],
        [emptyArray()],
        [emptyFunction()],
        [Infinity],
        [NaN],
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
        [[0], 0],
        [[0], -1],
        [[0], -Infinity],
        [['b'], 'b'],
        [['b'], 'a'],
        [[false], false]
      ],
      [
        [[0], 1],
        [[0], Infinity],
        [[1], '1'],
        [[1], false],
        [[0], emptyObject()],
        [[0], emptyFunction()],
        [[0], emptyArray()],
        [[0], NaN],
        [[0], undefined],
        [['b'], 'c'],
        [['1'], 0],
        [['1'], false],
        [['0'], emptyObject()],
        [['0'], emptyFunction()],
        [['0'], emptyArray()],
        [['0'], NaN],
        [['0'], undefined],
        [[false], true]
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator(0, notNullError()),
      [[-1], [1]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator(0, errorMetaCase([], [0], VALIDATOR_NAME)),
      [[1]],
      emptyMeta()
    );
  });
});