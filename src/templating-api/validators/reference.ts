import { getDep } from '@lib/classic-api/spreaders/get-dep';
import { setDep } from '@lib/classic-api/spreaders/set-dep';
import { setVDep } from '@lib/classic-api/spreaders/set-v-dep';
import { Validator } from '@lib/classic-api/types';
import { VLD } from '@lib/templating-api/lexemes';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractParam, extractValidator } from '@lib/templating-api/utilities';

export const referenceBuilder = (meta: CompilerMeta, { value, params, state }: ValidatorData) => (
  state === 1
    ? getDep(value, (v: Array<Validator<any>>) => v)
    : params && params[0].code === VLD.code
      ? setVDep(value, ...params.map(data => extractValidator(meta, data)))
      : setDep(value, params && extractParam(meta, params[0]))
);