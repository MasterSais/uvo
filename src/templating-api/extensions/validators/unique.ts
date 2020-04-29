import { unique } from '@lib/base-api/extensions/validators/unique';
import { extractInjection, extractLiteral } from '@lib/templating-api/extractors';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const uniqueBuilder = (meta: CompilerMeta, { error, params }: ValidatorData) => (
  params && params[0]
    ? (
      extractLiteral(params[0], (value: any) => unique(value(), error)) ||
      extractInjection(meta, params[0], (value: any) => unique(value, error))
    )
    : unique(null, error)
);