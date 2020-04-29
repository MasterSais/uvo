import { Error, Validator } from '@lib/base-api/types';
import { lengthFactory, makeSequence } from '@lib/base-api/utilities/factories';
import { defined, empty, equal, gte, lte, oneOf, regex } from '@lib/base-api/validators/is';
import { length, maxLen, minLen } from '@lib/base-api/validators/length';
import { multiple } from '@lib/base-api/validators/multiple';
import { extractInjection, extractInnerInjectionReference, extractInnerReference, extractLiteral } from '@lib/templating-api/extractors';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

const LEN_MLP = 'len-mlp';

const lenMultiple = lengthFactory(LEN_MLP, (value: number, len: number) => value % len === 0);

const lengthComparators = {
  '>': maxLen.not,
  '>=': minLen,
  '<': minLen.not,
  '<=': maxLen,
  '=': length,
  '!=': length.not,
  '%': lenMultiple,
  '!%': lenMultiple.not
};

const baseComparators = {
  '>=': gte,
  '<': gte.not,
  '<=': lte,
  '>': lte.not,
  '=': equal,
  '!=': equal.not,
  '%': multiple,
  '!%': multiple.not,
  '->': oneOf,
  '!->': oneOf.not,
  '*': regex,
  '!*': regex.not
};

const constComparators = {
  '=def': defined,
  '=emp': empty,
  '!=emp': empty.not
};

const extractConstantComparator = (p1: ValidatorData, p2: ValidatorData, error: Error) => (
  constComparators[p1.value + p2.value] && constComparators[p1.value + p2.value](error)
);

const comparatorBuilder = (comparators: Record<string, (param: any, error: Error) => Validator<any>>) => (meta: CompilerMeta, { params, error }: ValidatorData) => {
  const validators = [];

  for (let i = 0; i < params.length; i += 3) {
    const comparator = (value: any) => comparators[params[i].value](value, error);

    const param = params[i + 1];

    validators.push(
      extractConstantComparator(params[i], param, error) ||
      extractInnerInjectionReference(meta, param, comparator) ||
      extractInjection(meta, param, comparator) ||
      extractLiteral(param, comparator) ||
      extractInnerReference(param, comparator)
    );
  }

  return makeSequence(validators);
};

export const compareBuilder = comparatorBuilder(baseComparators);

export const lengthBuilder = comparatorBuilder(lengthComparators);