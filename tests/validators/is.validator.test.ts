import { V_IS as VALIDATOR_NAME } from '@lib/names';
import { is as validator } from '@lib/validators/is';
import { baseCases, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases, paramsCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () => {
    paramsCases(
      validator,
      [
        [emptyFunction()]
      ],
      [
        [1],
        ['12'],
        [true],
        [emptyArray()],
        [emptyObject()]
      ],
      VALIDATOR_NAME
    );
  });

  describe('base', () => {
    baseCases<any>(
      validator, [(value: any) => [0, '10'].includes(value)],
      [
        0, '10'
      ],
      [
        1, '1', null, undefined
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator((value: any) => [0, '10'].includes(value), notNullError()),
      [[0], [undefined]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator((value: any) => [0, '10'].includes(value), errorMetaCase([], [], VALIDATOR_NAME)),
      [[undefined]],
      emptyMeta()
    );
  });
});