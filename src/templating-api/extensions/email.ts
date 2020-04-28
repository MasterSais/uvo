import { email } from '@lib/base-api/extensions/validators/email';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const emailBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  email(error)
);