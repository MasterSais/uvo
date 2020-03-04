import { V_GTE as VALIDATOR_NAME } from '@lib/names';
import { gte as validator } from '@lib/validators/gte';
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
        [[0], 1],
        [[0], Infinity],
        [['b'], 'b'],
        [['b'], 'c'],
        [[true], true]
      ],
      [
        [[0], -1],
        [[0], -Infinity],
        [[0], '1'],
        [[0], true],
        [[0], emptyObject()],
        [[0], emptyFunction()],
        [[0], emptyArray()],
        [[0], NaN],
        [[0], undefined],
        [['b'], 'a'],
        [['0'], 10],
        [['0'], true],
        [['0'], emptyObject()],
        [['0'], emptyFunction()],
        [['0'], emptyArray()],
        [['0'], NaN],
        [['0'], undefined],
        [[true], false]
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator(0, notNullError()),
      [[1], [-1]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator(0, errorMetaCase([], [0], VALIDATOR_NAME)),
      [[-1]],
      emptyMeta()
    );
  });
});