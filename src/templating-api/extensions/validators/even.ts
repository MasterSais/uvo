import { even } from '@lib/base-api/extensions/validators/even';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const evenBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  even(error)
);