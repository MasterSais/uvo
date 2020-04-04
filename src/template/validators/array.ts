import { array } from '../../validators/array';
import { CompilerMeta, ValidatorData } from '../types';
import { getValidator } from './utilities';

export const arrayBuilder = (meta: CompilerMeta, { params = [] }: ValidatorData) => (
  array(params.map(param => getValidator(meta, param)))
);