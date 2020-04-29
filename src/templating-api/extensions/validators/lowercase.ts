import { lowercase } from '@lib/base-api/extensions/validators/lowercase';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const lowercaseBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  lowercase(error)
);