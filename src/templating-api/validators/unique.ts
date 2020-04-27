import { unique } from '@lib/base-api/validators/unique';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractInjection, extractLiteral } from '@lib/templating-api/utilities';

export const uniqueBuilder = (meta: CompilerMeta, { error, params }: ValidatorData) => (
  params && params[0]
    ? (
      extractLiteral(params[0], (value: any) => unique(value(), error)) ||
      extractInjection(meta, params[0], (value: any) => unique(value, error))
    )
    : unique(null, error)
);