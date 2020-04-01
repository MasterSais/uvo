import { array } from '../../validators/array';
import { CompilerMeta, ValidatorData } from '../types';
import { getValidator } from './utilities';

export const arrayBuilder = (meta: CompilerMeta, { params }: ValidatorData) => {
  const validators = [];

  for (let i = 0; i < params.length; i++) {
    validators.push(getValidator(meta, params[i]));
  }

  return array(validators);
};