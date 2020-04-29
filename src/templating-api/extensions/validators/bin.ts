import { bin } from '@lib/base-api/extensions/validators/bin';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const binBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  bin(error)
);