import { oct } from '@lib/base-api/extensions/validators/oct';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const octBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  oct(error)
);