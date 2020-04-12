import { dynamic } from '@lib/classic-api/spreaders/dynamic';
import { object2 } from '@lib/classic-api/validators/object2';
import { DLM, VL } from '@lib/templating-api/lexemes';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractInjection, extractInnerInjectionReference, extractInnerReference, extractValidator } from '@lib/templating-api/utilities';

export const objectBuilder = (meta: CompilerMeta, { params, error }: ValidatorData) => {
  if (!params) return object2(null, error);

  const fields: Array<Array<any>> = [[]];

  for (let i = 0; i < params.length; i++) {
    let param = null;

    if (params[i].code === DLM.code) {
      fields.push([]);

      continue;
    }

    if (params[i].code === VL.code) {
      param = params[i].value;
    }

    else if (params[i].cond) {
      const sequence = extractValidator(meta, params[i + 1]);

      param = (
        extractInnerReference(params[i], () => sequence) ||
        extractInnerInjectionReference(meta, params[i], (condition: () => boolean) => condition() && sequence) ||
        extractInjection(meta, params[i], (value: () => any) => dynamic(() => value() && sequence))
      );

      i++;
    }

    fields[fields.length - 1].push(param || extractValidator(meta, params[i]));
  }

  fields[fields.length - 1].length === 0 && fields.pop();

  return object2(fields as any, error);
};