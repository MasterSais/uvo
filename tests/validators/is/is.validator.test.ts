import { V_IS as VALIDATOR_NAME } from '@lib/classic-api/names';
import { is as validator } from '@lib/classic-api/validators/is';
import { baseCases, emptyMeta, errorMetaCase, notNullError, paramsCases, withErrorCases } from '@test/utilities';
import { right, rightParams, wrong, wrongParams } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('params', () =>
    paramsCases(validator, rightParams, wrongParams, VALIDATOR_NAME)
  );

  describe('base', () =>
    baseCases(validator, [(value: any) => [0, '10'].includes(value)], right, wrong)
  );

  describe('with error', () =>
    withErrorCases(validator((value: any) => [0, '10'].includes(value), notNullError()), [[right[0]], [wrong[0]]])
  );

  describe('with meta', () =>
    withErrorCases(validator((value: any) => [0, '10'].includes(value), errorMetaCase([], [], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta())
  );
});