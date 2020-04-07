import { V_FIELDS as VALIDATOR_NAME } from '@lib/classic-api/names';
import { fields as validator } from '@lib/classic-api/validators/fields';
import { baseCasesWithParams, emptyMeta, errorMetaCase, notNullError, paramsCases, withErrorCases } from '@test/utilities';
import { right, rightParams, wrong, wrongParams } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () =>
    paramsCases(validator, rightParams, wrongParams, VALIDATOR_NAME)
  );

  describe('base', () =>
    baseCasesWithParams(validator, right, wrong)
  );

  describe('with error', () =>
    withErrorCases(validator('f1', notNullError()), [[right[0][1]], [wrong[0][1]]])
  );

  describe('with meta', () =>
    withErrorCases(validator('f1', errorMetaCase([], ['f1'], VALIDATOR_NAME)), [[wrong[0][1]]], emptyMeta())
  );
});