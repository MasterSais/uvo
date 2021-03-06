import { consecutive } from '@lib/base-api/groupers/consecutive';
import { or } from '@lib/base-api/groupers/or';
import { parallel } from '@lib/base-api/groupers/parallel';
import { Validator } from '@lib/base-api/types';
import { extractSequence } from '@lib/templating-api/extractors';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

const grouperBuilder = (grouper: (...args: Array<Validator<any>>) => Validator<any>) => (meta: CompilerMeta, { params = [] }: ValidatorData) => (
  grouper(...params.map(param => extractSequence(meta, param)))
);

export const consecutiveBuilder = grouperBuilder(consecutive);

export const orBuilder = grouperBuilder(or);

export const parallelBuilder = grouperBuilder(parallel);