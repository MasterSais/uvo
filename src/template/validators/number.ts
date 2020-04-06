import { number } from '../../validators/number';
import { CompilerMeta, ValidatorData } from '../types';
import { extractError } from './utilities';

export const numberBuilder = (meta: CompilerMeta, { error }: ValidatorData) => (
  number(extractError(meta, error))
);