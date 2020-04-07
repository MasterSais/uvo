import { V_REG as VALIDATOR_NAME } from '@lib/classic-api/names';
import { regex as validator } from '@lib/classic-api/validators/is';
import { baseCases, emptyMeta, errorMetaCase, invertError, notNullError, paramsCases, withErrorCases } from '@test/utilities';
import { right, rightParams, wrong, wrongParams } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () =>
    paramsCases(validator, rightParams, wrongParams, VALIDATOR_NAME)
  );

  describe('base', () =>
    baseCases(validator, [/^(a|1|true)$/], right, wrong)
  );

  describe('base › not', () =>
    baseCases(validator.not, [/^(a|1|true)$/], [wrong[0]], [right[0]])
  );

  describe('with error', () =>
    withErrorCases(validator(/^(a|1|true)$/, notNullError()), [[right[0]], [wrong[0]]])
  );

  describe('with meta', () =>
    withErrorCases(validator(/^(a|1|true)$/, errorMetaCase([], [/^(a|1|true)$/], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta())
  );

  describe('with error › not', () =>
    withErrorCases(validator.not(/^(a|1|true)$/, notNullError()), [[wrong[0]], [right[0]]])
  );

  describe('with meta › not', () =>
    withErrorCases(validator.not(/^(a|1|true)$/, errorMetaCase([], [/^(a|1|true)$/], invertError(VALIDATOR_NAME, true))), [[right[0]]], emptyMeta())
  );
});