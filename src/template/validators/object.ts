import { object2 } from '../../validators/object2';
import { DLM, VL } from '../lexemes';
import { CompilerMeta, ValidatorData } from '../types';
import { getValidator } from './utilities';

export const objectBuilder = (meta: CompilerMeta, { params }: ValidatorData) => {
  const fields: Array<Array<any>> = [[]];

  for (let i = 0; i < params.length; i++) {
    if (params[i].code === DLM.code) {
      fields.push([]);
    } else {
      fields[fields.length - 1].push(
        params[i].code === VL.code
          ? params[i].value
          : getValidator(meta, params[i])
      );
    }
  }

  return object2(fields as any);
};