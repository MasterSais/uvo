import { clamp } from '@lib/base-api/extensions/processors/clamp';
import { ValidatorErrorCallback, MetaData } from '@lib/base-api/types';
import { extractInjection, extractLiteral } from '@lib/templating-api/extractors';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const clampBuilder = (meta: CompilerMeta, { params }: ValidatorData) => (
  extractLiteral(params[0], (min: any) => (
    extractLiteral(params[2], (max: any) => (
      clamp(min(), max())
    ))
  ))
  ||
  extractInjection(meta, params[0], (min: any) => (
    extractInjection(meta, params[2], (max: any) => (
      (value: any, onError?: ValidatorErrorCallback, meta?: MetaData) => clamp(min(), max())(value, onError, meta)
    ))
  ))
);