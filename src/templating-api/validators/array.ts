import { array } from '@lib/classic-api/validators/array';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractValidator } from '@lib/templating-api/utilities';

export const arrayBuilder = (meta: CompilerMeta, { params = [], error }: ValidatorData) => (
  array(params.map(param => extractValidator(meta, param)), error)
);