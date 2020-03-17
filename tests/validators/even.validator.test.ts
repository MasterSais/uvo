import { V_EVN as VALIDATOR_NAME } from '@lib/names';
import { even as validator } from '@lib/validators/multiple';
import { baseCases, emptyMeta, errorMetaCase, invertError, notNullError, withErrorCases } from '@test/utilities';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () => {
    baseCases<any>(
      validator, [],
      [
        0, -0, 2, -2
      ],
      [
        1.5, -1.5, 0.01, 1
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
      validator(errorMetaCase([], [2], VALIDATOR_NAME)),
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
      validator.not(errorMetaCase([], [2], invertError(VALIDATOR_NAME, true))),
      [[0]],
      emptyMeta()
    );
  });
});