import { object2 } from '../../validators/object2';
import { DLM, VL } from '../lexemes';
import { CompilerMeta, ValidatorData } from '../types';
import { extractError, extractValidator } from './utilities';

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

  return object2(fields as any, extractError(meta, error));
};