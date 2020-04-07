import { number } from '@lib/classic-api/validators/number';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractError } from '@lib/templating-api/utilities';

export const numberBuilder = (meta: CompilerMeta, { error }: ValidatorData) => (
  number(extractError(meta, error))
);