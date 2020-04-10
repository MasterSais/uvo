import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { lengthFactory } from '@lib/classic-api/utilities';
import { length, maxLen, minLen } from '@lib/classic-api/validators/length';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractError, extractParam } from '@lib/templating-api/utilities';

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

export const lengthBuilder = (meta: CompilerMeta, { params, error }: ValidatorData) => {
  const validators = [];

  for (let i = 0; i < params.length; i += 3) {
    validators.push(
      lengthComparators[params[i].value](extractParam(meta, params[i + 1]), extractError(meta, error))
    );
  }

  return consecutive(...validators);
};