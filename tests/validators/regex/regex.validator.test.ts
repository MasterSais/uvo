import { V_REG as VALIDATOR_NAME } from '@lib/classic-api/names';
import { regex as validator } from '@lib/classic-api/validators/is';
import { template } from '@lib/templating-api/template';
import { baseCases, emptyMeta, errorMetaCase, invertError, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCases(validator, [/^(a|1|true)$/], right, wrong)
  );

  describe('base › not', () =>
    baseCases(validator.not, [/^(a|1|true)$/], [wrong[0]], [right[0]])
  );

  describe('base › template', () =>
    baseCases(template('@compare(*$0)'), [[/^(a|1|true)$/]], right, wrong)
  );

  describe('base › template › short', () =>
    baseCases(template('@c(*$0)'), [[/^(a|1|true)$/]], [right[0]], [wrong[0]])
  );

  describe('base › template › not', () =>
    baseCases(template('@compare(!*$0)'), [[/^(a|1|true)$/]], wrong, right)
  );

  describe('base › template › short › not', () =>
    baseCases(template('@c(!*$0)'), [[/^(a|1|true)$/]], [wrong[0]], [right[0]])
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

  describe('with error › template', () =>
    withErrorCases(template('@compare(*$0)!0')([/^(a|1|true)$/], [notNullError()]), [[right[0]], [wrong[0]]])
  );

  describe('with meta › template', () =>
    withErrorCases(template('@compare(*$0)!0')([/^(a|1|true)$/], [errorMetaCase([], [/^(a|1|true)$/], VALIDATOR_NAME)]), [[wrong[0]]], emptyMeta())
  );

  describe('with error › template › not', () =>
    withErrorCases(template('@compare(!*$0)!0')([/^(a|1|true)$/], [notNullError()]), [[wrong[0]], [right[0]]])
  );

  describe('with meta › template › not', () =>
    withErrorCases(template('@compare(!*$0)!0')([/^(a|1|true)$/], [errorMetaCase([], [/^(a|1|true)$/], invertError(VALIDATOR_NAME, true))]), [[right[0]]], emptyMeta())
  );
});