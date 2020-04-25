import { bool } from '@lib/base-api/validators/bool';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const boolBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  bool(error)
);