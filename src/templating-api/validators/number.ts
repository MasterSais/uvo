import { number } from '@lib/classic-api/validators/number';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const numberBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  number(error)
);