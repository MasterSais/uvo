import { number } from '@lib/base-api/validators/number';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const numberBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  number(error)
);