import { float } from '@lib/base-api/extensions/validators/float';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const floatBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  float(error)
);