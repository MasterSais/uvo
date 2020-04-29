import { alphanum } from '@lib/base-api/extensions/validators/alphanum';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const alphanumBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  alphanum(error)
);