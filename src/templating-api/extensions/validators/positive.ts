import { positive } from '@lib/base-api/extensions/validators/positive';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const positiveBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  positive(error)
);