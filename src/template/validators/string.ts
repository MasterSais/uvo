import { string } from '../../validators/string';
import { CompilerMeta, ValidatorData } from '../types';
import { extractError } from './utilities';

export const stringBuilder = (meta: CompilerMeta, { error }: ValidatorData) => (
  string(extractError(meta, error))
);