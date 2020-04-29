import { array } from '@lib/base-api/validators/array';
import { extractSequence } from '@lib/templating-api/extractors';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const arrayBuilder = (meta: CompilerMeta, { params = [], error }: ValidatorData) => (
  array(params.map(param => extractSequence(meta, param)), error)
);