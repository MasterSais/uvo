import { dynamic } from '@lib/classic-api/spreaders/dynamic';
import { object2 } from '@lib/classic-api/validators/object2';
import { DLM } from '@lib/templating-api/lexemes';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractInjection, extractInnerInjectionReference, extractInnerReference, extractValidator } from '@lib/templating-api/utilities';

export const objectBuilder = (meta: CompilerMeta, { params, error }: ValidatorData) => {
  if (!params) return object2(null, error);

  const fields: Array<Array<any>> = [];

  for (let i = -1; i < params.length; i++) {
    let param = null;

    if (i === -1 || params[i].code === DLM.code) {
      if (params[i + 1]) {
        fields.push([params[++i].value]);
      }

      continue;
    }

    if (params[i].cond) {
      const sequence = extractValidator(meta, params[i + 1]);

      param = (
        extractInnerReference(params[i], () => sequence) ||
        extractInnerInjectionReference(meta, params[i], (condition: () => boolean) => condition() && sequence) ||
        extractInjection(meta, params[i], (value: () => any) => dynamic(() => value() && sequence))
      );

      i++;
    }

    fields[fields.length - 1].push(
      param ||
      extractInjection(meta, params[i], (v: any) => v) ||
      extractValidator(meta, params[i])
    );
  }

  return object2(fields as any, error);
};