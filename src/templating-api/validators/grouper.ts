import { consecutive } from '@lib/classic-api/groupers/consecutive';
import { or } from '@lib/classic-api/groupers/or';
import { parallel } from '@lib/classic-api/groupers/parallel';
import { Validator } from '@lib/classic-api/types';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractValidator } from '@lib/templating-api/utilities';

const grouperBuilder = (grouper: (...args: Array<Validator<any>>) => Validator<any>) => (meta: CompilerMeta, { params = [] }: ValidatorData) => (
  grouper(...params.map(param => extractValidator(meta, param)))
);

export const consecutiveBuilder = grouperBuilder(consecutive);

export const orBuilder = grouperBuilder(or);

export const parallelBuilder = grouperBuilder(parallel);