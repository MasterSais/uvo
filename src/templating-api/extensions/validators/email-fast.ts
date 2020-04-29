import { emailFast } from '@lib/base-api/extensions/validators/email-fast';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const fastEmailBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  emailFast(error)
);