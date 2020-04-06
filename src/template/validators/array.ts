import { array } from '../../validators/array';
import { CompilerMeta, ValidatorData } from '../types';
import { extractError, extractValidator } from './utilities';

export const arrayBuilder = (meta: CompilerMeta, { params = [], error }: ValidatorData) => (
  array(params.map(param => extractValidator(meta, param)), extractError(meta, error))
);