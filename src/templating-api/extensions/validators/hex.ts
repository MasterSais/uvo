import { hex } from '@lib/base-api/extensions/validators/hex';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const hexBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  hex(error)
);