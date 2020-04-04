import { V_EM as VALIDATOR_NAME } from '@lib/names';
import { empty as validator } from '@lib/validators/is';
import { baseCases, emptyArray, emptyFunction, emptyMeta, emptyObject, errorMetaCase, invertError, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () => {
    baseCases<any>(
      validator, [],
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
      validator(notNullError()),
      [[null], [3]]
    );
  });

  describe('with meta', () => {
    withErrorCases<any>(
      validator(errorMetaCase([], [null, undefined, ''], VALIDATOR_NAME)),
      [[3]],
      emptyMeta()
    );
  });

  describe('with error › not', () => {
    withErrorCases<any>(
      validator.not(notNullError()),
      [[3], [null]]
    );
  });

  describe('with meta › not', () => {
    withErrorCases<any>(
      validator.not(errorMetaCase([], [null, undefined, ''], invertError(VALIDATOR_NAME, true))),
      [[null]],
      emptyMeta()
    );
  });
});