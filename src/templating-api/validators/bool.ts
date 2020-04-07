import { bool } from '@lib/classic-api/validators/bool';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractError } from '@lib/templating-api/utilities';

export const boolBuilder = (meta: CompilerMeta, { error }: ValidatorData) => (
  bool(extractError(meta, error))
);