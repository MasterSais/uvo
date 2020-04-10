import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { getDep } from '@lib/classic-api/spreaders/get-dep';
import { isDefined } from '@lib/classic-api/utilities';
import { equal, gte, lte, oneOf } from '@lib/classic-api/validators/is';
import { multiple } from '@lib/classic-api/validators/multiple';
import { REF } from '@lib/templating-api/lexemes';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractError, extractParam } from '@lib/templating-api/utilities';

const comparators = {
  '>=': gte,
  '<': gte.not,
  '<=': lte,
  '>': lte.not,
  '=': equal,
  '!=': equal.not,
  '%': multiple,
  '!%': multiple.not,
  '->': oneOf,
  '!->': oneOf.not
};

export const compareBuilder = (meta: CompilerMeta, { params, error }: ValidatorData) => {
  const validators = [];

  for (let i = 0; i < params.length; i += 3) {
    const calleeParam = extractParam(meta, params[i + 1]);

    const valueMapper = (
      calleeParam.callee
        ? (value: any) => () => calleeParam.callee(value)
        : (value: any) => () => value
    );

    validators.push(
      calleeParam.code === REF.code
        ? getDep(calleeParam.value, (value: any) =>
          isDefined(value) && comparators[params[i].value](valueMapper(value))
        )
        : comparators[params[i].value](calleeParam, extractError(meta, error))
    );
  }

  return consecutive(...validators);
};