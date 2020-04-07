import { V_UQ as VALIDATOR_NAME } from '@lib/classic-api/names';
import { unique as validator } from '@lib/classic-api/validators/unique';
import { baseCasesWithParams, emptyMeta, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';
import { objCases, right, wrong } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCasesWithParams(() => validator(), right, wrong)
  );

  describe('base 2', () =>
    baseCasesWithParams(() => validator('id'), objCases, [])
  );

  describe('with error', () =>
    withErrorCases(validator(null, notNullError()), [[right[0][1], right[0][2]], [wrong[0][1]]])
  );

  describe('with meta', () =>
    withErrorCases(validator(null, errorMetaCase([], [null], VALIDATOR_NAME)), [[wrong[0][1]]], emptyMeta())
  );
});