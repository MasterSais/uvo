import { V_OOF as VALIDATOR_NAME } from '@lib/names';
import { invertError } from '@lib/utilities';
import { empty, oneOf as validator } from '@lib/validators/is';
import { baseCases, baseCasesWithParams, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${invertError(VALIDATOR_NAME, true)}`, () => {
  describe('base', () => {
    baseCasesWithParams<any>(
      validator.not,
      [
        [[[]], 1],
        [[[0, 1, 2]], 3],
        [[['0', '1', '2']], '03'],
        [[[true, false]], 'true'],
        [[[true, false]], 0],
        [[[0, '1', true]], false],
        [[[emptyArray(), 0, 0]], []],
        [[[0, emptyObject(), 0]], {}]
      ],
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
      ]
    );
  });

  describe('base › empty', () => {
    baseCases<any>(
      empty.not(),
      [
        1, true, 'abc', Infinity,
        emptyArray(), emptyFunction(), emptyObject()
      ],
      [
        null, undefined, ''
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator.not([0, 1, 2], notNullError()),
      [[3], [1]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator.not([0, 1, 2], errorMetaCase([], [[0, 1, 2]], invertError(VALIDATOR_NAME, true))),
      [[1]],
      emptyMeta()
    );
  });

  describe('with error › empty', () => {
    withErrorCases<any>(
      empty.not(notNullError()),
      [[3], [null]]
    );
  });

  describe('with meta › empty', () => {
    withErrorCases<any>(
      empty.not(errorMetaCase([], [[null, undefined, '']], invertError(VALIDATOR_NAME, true))),
      [[null]],
      emptyMeta()
    );
  });
});