import { dynamic } from '@lib/base-api/spreaders/dynamic';
import { identity } from '@lib/base-api/utilities/types';
import { object2 } from '@lib/base-api/validators/object2';
import { extractInjection, extractInnerInjectionReference, extractInnerReference, extractSequence } from '@lib/templating-api/extractors';
import { CND, DLM } from '@lib/templating-api/lexemes';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const objectBuilder = (meta: CompilerMeta, { params, error }: ValidatorData) => {
  if (!params) return object2(null, error);

  const fields: Array<Array<any>> = [];

  for (let i = -1; i < params.length; i++) {
    let param = null;

    if (i === -1 || params[i].code === DLM.code) {
      if (params[i + 1]) {
        i++;

        fields.push([
          extractInjection(meta, params[i], identity) ||
          params[i].value
        ]);
      }

      continue;
    }

    if (params[i].code2 === CND.code) {
      const sequence = extractSequence(meta, params[i + 1]);

      param = (
        extractInnerReference(params[i], () => sequence) ||
        extractInnerInjectionReference(meta, params[i], (condition: () => boolean) => condition() && sequence) ||
        extractInjection(meta, params[i], (value: () => any) => dynamic(() => value() && sequence))
      );

      i++;
    }

    fields[fields.length - 1].push(
      param ||
      extractSequence(meta, params[i])
    );
  }

  return object2(fields as any, error);
};