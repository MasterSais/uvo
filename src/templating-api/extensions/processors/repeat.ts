import { repeat } from '@lib/base-api/extensions/processors/repeat';
import { ErrorCallback, MetaData } from '@lib/base-api/types';
import { extractInjection, extractLiteral } from '@lib/templating-api/extractors';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const repeatBuilder = (meta: CompilerMeta, { params }: ValidatorData) => (
  extractLiteral(params[0], (param: any) => (
    repeat(param())
  ))
  ||
  extractInjection(meta, params[0], (param: any) => (
    (value: any, onError?: ErrorCallback, meta?: MetaData) => repeat(param())(value, onError, meta)
  ))
);