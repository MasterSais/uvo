import { contains } from '@lib/base-api/extensions/validators/contains';
import { extractInjection, extractLiteral } from '@lib/templating-api/extractors';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const containsBuilder = (meta: CompilerMeta, { error, params }: ValidatorData) => (
  params && params[0]
    ? (
      extractLiteral(params[0], (value: any) => contains(value(), error)) ||
      extractInjection(meta, params[0], (value: any) => contains(value, error))
    )
    : contains(null, error)
);