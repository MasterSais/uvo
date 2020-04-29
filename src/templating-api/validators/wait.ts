import { wait } from '@lib/base-api/spreaders/wait';
import { extractLiteral } from '@lib/templating-api/extractors';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const waitBuilder = (_: CompilerMeta, { params: [param] }: ValidatorData) => (
  extractLiteral(param, (value: any) => wait(value()))
);