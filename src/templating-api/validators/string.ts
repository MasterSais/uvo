import { string } from '@lib/classic-api/validators/string';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractError } from '@lib/templating-api/utilities';

export const stringBuilder = (meta: CompilerMeta, { error }: ValidatorData) => (
  string(extractError(meta, error))
);