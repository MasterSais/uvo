import { object2 } from '@lib/classic-api/validators/object2';
import { DLM, VL } from '@lib/templating-api/lexemes';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractError, extractValidator } from '@lib/templating-api/utilities';

export const objectBuilder = (meta: CompilerMeta, { params, error }: ValidatorData) => {
  if (!params) return object2();

  const fields: Array<Array<any>> = [[]];

  params.forEach(param => (
    param.code === DLM.code
      ? fields.push([])
      : (
        fields[fields.length - 1].push(
          param.code === VL.code ? param.value : extractValidator(meta, param)
        )
      )
  ));

  fields[fields.length - 1].length === 0 && fields.pop();

  return object2(fields as any, extractError(meta, error));
};