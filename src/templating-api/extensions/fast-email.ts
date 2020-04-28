import { fastEmail } from '@lib/base-api/extensions/validators/fast-email';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const fastEmailBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  fastEmail(error)
);