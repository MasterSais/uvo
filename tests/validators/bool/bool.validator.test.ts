import { V_BLN as VALIDATOR_NAME } from '@lib/base-api/names';
import { template, tml } from '@lib/templating-api/template';
import { bool as validator } from '@lib/base-api/validators/bool';
import { baseCases, emptyMeta, errorMetaCase, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

const possibleValues = [false, true, 0, 1, '0', '1', 'false', 'true'];

const toBool = (value: any) => possibleValues.indexOf(value) >= 0 && Boolean(possibleValues.indexOf(value) % 2);

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCases(validator, [], right, wrong, toBool)
  );

  describe('base › template', () =>
    baseCases(template('@bool'), [], right, wrong, toBool)
  );

  describe('base › template › short', () =>
    baseCases(tml`@b`, [], [right[0]], [wrong[0]], toBool)
  );

  describe('with error', () =>
    withErrorCases(validator(notNullError()), [[right[0]], [wrong[0]]], null, toBool)
  );

  describe('with meta', () =>
    withErrorCases(validator(errorMetaCase([], [], VALIDATOR_NAME)), [[wrong[0]]], emptyMeta(), toBool)
  );

  describe('with error › template', () =>
    withErrorCases(template('@bool!0')([], [notNullError()]), [[right[0]], [wrong[0]]])
  );

  describe('with meta › template', () =>
    withErrorCases(template('@bool!0')([], [errorMetaCase([], [], VALIDATOR_NAME)]), [[wrong[0]]], emptyMeta())
  );
});