import { V_OOF as VALIDATOR_NAME } from '@lib/names';
import { oneOf as validator, empty } from '@lib/validators/is';
import { baseCasesWithParams, emptyMeta, errorMetaCase, notNullError, paramsCases, withErrorCases, emptyArray, emptyObject, emptyFunction, baseCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () => {
    paramsCases(
      validator,
      [
        [[0, 0]],
        [[0]],
        [[]],
        [[null, undefined, '']]
      ],
      [
        [{}],
        [1],
        [NaN],
        [Infinity],
        ['1'],
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
        [[['0', '1', '2']], '03'],
        [[[true, false]], 'true'],
        [[[true, false]], 0],
        [[[0, '1', true]], false],
        [[[emptyArray(), 0, 0]], []],
        [[[0, emptyObject(), 0]], {}]
      ]
    );
  });

  describe('base › empty', () => {
    baseCases<any>(
      empty(),
      [
        null, undefined, ''
      ],
      [
        1, true, 'abc', Infinity,
        emptyArray(), emptyFunction(), emptyObject()
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

  describe('with error › empty', () => {
    withErrorCases<any>(
      empty(notNullError()),
      [[null], [3]]
    );
  });

  describe('with meta › empty', () => {
    withErrorCases<any>(
      empty(errorMetaCase([], [[null, undefined, '']], VALIDATOR_NAME)),
      [[3]],
      emptyMeta()
    );
  });
});