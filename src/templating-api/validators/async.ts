import { async } from '@lib/base-api/validators/async';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractLiteral } from '@lib/templating-api/utilities';

export const asyncBuilder = (_: CompilerMeta, { params, error }: ValidatorData) => (
  params && params[0]
    ? extractLiteral(params[0], (value: any) => async(value(), error))
    : async(null, error)
);