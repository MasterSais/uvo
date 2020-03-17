import { V_INT as VALIDATOR_NAME } from '@lib/names';
import { integer as validator } from '@lib/validators/multiple';
import { baseCases, emptyMeta, errorMetaCase, invertError, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () => {
    baseCases<any>(
      validator, [],
      [
        0, -0, 1, -1
      ],
      [
        1.5, -1.5, 0.01
      ]
    );
  });

  describe('with error', () => {
    withErrorCases(
      validator(notNullError()),
      [[0], [null]]
    );
  });

  describe('with meta', () => {
    withErrorCases(
      validator(errorMetaCase([], [1], VALIDATOR_NAME)),
      [[null]],
      emptyMeta()
    );
  });

  describe('with error › not', () => {
    withErrorCases(
      validator.not(notNullError()),
      [[null], [0]]
    );
  });

  describe('with meta › not', () => {
    withErrorCases(
      validator.not(errorMetaCase([], [1], invertError(VALIDATOR_NAME, true))),
      [[0]],
      emptyMeta()
    );
  });
});