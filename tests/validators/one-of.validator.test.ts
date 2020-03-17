import { V_OOF as VALIDATOR_NAME } from '@lib/names';
import { oneOf as validator } from '@lib/validators/is';
import { baseCasesWithParams, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, invertError, notNullError, paramsCases, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () => {
    paramsCases(
      validator,
      [
        [[0, 0]],
        [[0]],
        [[]],
        ['0123'],
        [[null, undefined, '']]
      ],
      [
        [{}],
        [1],
        [NaN],
        [Infinity],
        [true],
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
        [[[1]], 1],
        [[[0, 1, 2]], 1],
        [['123'], 1],
        [['abc'], 'a'],
        [[['0', '1', '2']], '1'],
        [[[true, false]], true],
        [[[true, null]], null],
        [[[12, null, undefined]], undefined],
        [[[0, '1', true]], '1'],
        [[[0, '1', true]], 0],
        [[[0, emptyObject(), 0]], emptyObject()],
        [[[emptyArray(), 0, 0]], emptyArray()],
        [[[0, 0, emptyFunction()]], emptyFunction()]
      ],
      [
        [[[]], 1],
        [[[0, 1, 2]], 3],
        [['123'], 4],
        [['abc'], 'ac'],
        [[['0', '1', '2']], '03'],
        [[[true, false]], 'true'],
        [[[true, false]], 0],
        [[[0, '1', true]], false],
        [[[emptyArray(), 0, 0]], []],
        [[[0, emptyObject(), 0]], {}]
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator([0, 1, 2], notNullError()),
      [[1], [3]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator([0, 1, 2], errorMetaCase([], [[0, 1, 2]], VALIDATOR_NAME)),
      [[3]],
      emptyMeta()
    );
  });

  describe('with error › not', () => {
    withErrorCases<any>(
      validator.not([0, 1, 2], notNullError()),
      [[3], [1]]
    );
  });

  describe('with meta › not', () => {
    withErrorCases<any>(
      validator.not([0, 1, 2], errorMetaCase([], [[0, 1, 2]], invertError(VALIDATOR_NAME, true))),
      [[1]],
      emptyMeta()
    );
  });
});