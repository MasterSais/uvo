import { date } from '../../validators/date';
import { CompilerMeta, ValidatorData } from '../types';
import { extractError } from './utilities';

export const dateBuilder = (meta: CompilerMeta, { error }: ValidatorData) => (
  date(extractError(meta, error))
);