import { url } from '@lib/base-api/extensions/validators/url';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const urlBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  url(error)
);