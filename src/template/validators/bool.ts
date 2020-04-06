import { bool } from '../../validators/bool';
import { CompilerMeta, ValidatorData } from '../types';
import { extractError } from './utilities';

export const boolBuilder = (meta: CompilerMeta, { error }: ValidatorData) => (
  bool(extractError(meta, error))
);