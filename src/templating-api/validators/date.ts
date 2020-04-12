import { date } from '@lib/classic-api/validators/date';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const dateBuilder = (_: CompilerMeta, { error }: ValidatorData) => (
  date(error)
);