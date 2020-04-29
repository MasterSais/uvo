import { notContains } from '@lib/base-api/extensions/validators/not-contains';
import { extractInjection, extractLiteral } from '@lib/templating-api/extractors';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const notContainsBuilder = (meta: CompilerMeta, { error, params }: ValidatorData) => (
  params && params[0]
    ? (
      extractLiteral(params[0], (value: any) => notContains(value(), error)) ||
      extractInjection(meta, params[0], (value: any) => notContains(value, error))
    )
    : notContains(null, error)
);