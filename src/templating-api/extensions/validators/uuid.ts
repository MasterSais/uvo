import { uuid } from '@lib/base-api/extensions/validators/uuid';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const uuidBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  uuid(error)
);