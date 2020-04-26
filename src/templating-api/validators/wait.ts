import { wait } from '@lib/base-api/spreaders/wait';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractLiteral } from '@lib/templating-api/utilities';

export const waitBuilder = (_: CompilerMeta, { params: [param] }: ValidatorData) => (
  extractLiteral(param, (value: any) => wait(value()))
);