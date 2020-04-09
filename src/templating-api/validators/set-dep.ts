import { setDep } from '@lib/classic-api/spreaders/set-dep';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractParam } from '@lib/templating-api/utilities';

export const setDepBuilder = (meta: CompilerMeta, { value, params }: ValidatorData) => (
  setDep(value, params && extractParam(meta, params))
);