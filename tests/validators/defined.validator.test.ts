import { V_DEF as VALIDATOR_NAME } from '@lib/names';
import { defined as validator } from '@lib/validators/is';
import { baseCases, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () => {
    baseCases<any>(
      validator, [],
      [
        1, 'abc', true, null,
        emptyObject(), emptyArray(), emptyFunction()
      ],
      [
        undefined
      ]
    );
  });

  describe('with error', () => {
    withErrorCases<any>(
      validator(notNullError()),
      [[1], [undefined]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator(errorMetaCase([], [], VALIDATOR_NAME)),
      [[undefined]],
      emptyMeta()
    );
  });
});