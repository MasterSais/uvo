import { date } from '@lib/classic-api/validators/date';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractError } from '@lib/templating-api/utilities';

export const dateBuilder = (meta: CompilerMeta, { error }: ValidatorData) => (
  date(extractError(meta, error))
);