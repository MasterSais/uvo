import { uppercase } from '@lib/base-api/extensions/validators/uppercase';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const uppercaseBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  uppercase(error)
);