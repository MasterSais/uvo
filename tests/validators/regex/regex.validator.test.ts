import { V_REG as VALIDATOR_NAME } from '@lib/base-api/names';
import { regex as validator } from '@lib/base-api/validators/is';
import { compile, template } from '@lib/templating-api/template';
import { baseCases, compileWithErrorCases, emptyMeta, errorMetaCase, invertError, notNullError, withErrorCases } from '@test/utilities';
import { right, wrong } from './cases';

describe(`validator › ${VALIDATOR_NAME}`, () => {
  describe('base', () =>
    baseCases(validator, [/^(a|1|true)$/], right, wrong)
  );

  describe('base › not', () =>
    baseCases(validator.not, [/^(a|1|true)$/], [wrong[0]], [right[0]])
  );

  describe('base › compile', () =>
    baseCases(compile('@compare(*$0)'), [[/^(a|1|true)$/]], right, wrong)
  );

  describe('base › compile › short', () =>
    baseCases(compile('@c(*$0)'), [[/^(a|1|true)$/]], [right[0]], [wrong[0]])
  );

  describe('base › compile › not', () =>
    baseCases(compile('@compare(!*$0)'), [[/^(a|1|true)$/]], wrong, right)
  );

  describe('base › compile › short › not', () =>
    baseCases(compile('@c(!*$0)'), [[/^(a|1|true)$/]], [wrong[0]], [right[0]])
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

  describe('with error › compile', () =>
    compileWithErrorCases(compile('@compare(*$0)!0 ~e')([/^(a|1|true)$/], [notNullError()]), [right[0], wrong[0]])
  );

  describe('with meta › template', () =>
    withErrorCases(template('@compare(*$0)!0')([/^(a|1|true)$/], [errorMetaCase([], [/^(a|1|true)$/], VALIDATOR_NAME)]), [[wrong[0]]], emptyMeta())
  );

  describe('with error › compile › not', () =>
    compileWithErrorCases(compile('@compare(!*$0)!0 ~e')([/^(a|1|true)$/], [notNullError()]), [wrong[0], right[0]])
  );

  describe('with meta › template › not', () =>
    withErrorCases(template('@compare(!*$0)!0')([/^(a|1|true)$/], [errorMetaCase([], [/^(a|1|true)$/], invertError(VALIDATOR_NAME, true))]), [[right[0]]], emptyMeta())
  );
});