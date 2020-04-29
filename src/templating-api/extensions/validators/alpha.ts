import { alpha } from '@lib/base-api/extensions/validators/alpha';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const alphaBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  alpha(error)
);