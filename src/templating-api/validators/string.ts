import { string } from '@lib/base-api/validators/string';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const stringBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  string(error)
);