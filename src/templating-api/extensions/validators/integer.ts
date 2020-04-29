import { integer } from '@lib/base-api/extensions/validators/integer';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const integerBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  integer(error)
);