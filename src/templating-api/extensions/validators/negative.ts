import { negative } from '@lib/base-api/extensions/validators/negative';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const negativeBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  negative(error)
);