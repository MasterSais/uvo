import { round } from '@lib/base-api/extensions/processors/round';
import { ValidatorErrorCallback, MetaData } from '@lib/base-api/types';
import { extractInjection, extractLiteral } from '@lib/templating-api/extractors';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const roundBuilder = (meta: CompilerMeta, { params }: ValidatorData) => (
  extractLiteral(params[0], (param: any) => (
    round(param())
  ))
  ||
  extractInjection(meta, params[0], (param: any) => (
    (value: any, onError?: ValidatorErrorCallback, meta?: MetaData) => round(param())(value, onError, meta)
  ))
);