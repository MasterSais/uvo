import { trim } from '@lib/base-api/extensions/processors/trim';
import { ErrorCallback, MetaData } from '@lib/base-api/types';
import { extractInjection, extractLiteral } from '@lib/templating-api/extractors';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const trimBuilder = (meta: CompilerMeta, { params }: ValidatorData) => (
  extractLiteral(params[0], (param: any) => (
    trim(param())
  ))
  ||
  extractInjection(meta, params[0], (param: any) => (
    (value: any, onError?: ErrorCallback, meta?: MetaData) => trim(param())(value, onError, meta)
  ))
);