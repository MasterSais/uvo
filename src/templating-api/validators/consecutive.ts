import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractValidator } from '@lib/templating-api/utilities';

export const consecutiveBuilder = (meta: CompilerMeta, { params = [] }: ValidatorData) => (
  consecutive(...params.map(param => extractValidator(meta, param)))
);