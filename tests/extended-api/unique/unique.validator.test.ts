import { V_UQ as VALIDATOR_NAME } from '@lib/base-api/extensions/names';
import { unique as validator } from '@lib/base-api/extensions/validators/unique';
import { baseCasesWithParams, emptyMeta, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';
import { objCases, right, wrong } from './cases';

// provide([
//   [uniqueBuilder, ['unique']]
// ]);

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCasesWithParams(param => validator(param), right, wrong)
  );

  // describe('base › template', () =>
  //   baseCasesWithParams(() => template(`@unique`)(), right, wrong)
  // );

  describe('base 2', () =>
    baseCasesWithParams(param => validator(param), objCases, [])
  );

  // describe('base 2 › template', () =>
  //   baseCasesWithParams(() => template(`@unique('id')`)(), objCases, [])
  // );

  // describe('base 2 › template › injection', () =>
  //   baseCasesWithParams(() => template(`@unique($0)`)([({ id }: any) => id]), objCases, [])
  // );

  describe('with error', () =>
    withErrorCases(validator(null, notNullError()), [[right[0][1], right[0][2]], [wrong[0][1]]])
  );

  describe('with meta', () =>
    withErrorCases(validator(null, errorMetaCase([], [null], VALIDATOR_NAME)), [[wrong[0][1]]], emptyMeta())
  );

  // describe('with error › template', () =>
  //   withErrorCases(template('@unique!0')([], [notNullError()]), [[right[0][1]], [wrong[0][1]]])
  // );

  // describe('with meta › template', () =>
  //   withErrorCases(template('@unique!0')([], [errorMetaCase([], [null], VALIDATOR_NAME)]), [[wrong[0][1]]], emptyMeta())
  // );
});