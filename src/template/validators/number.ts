import { number } from '../../validators/number';
import { CompilerMeta, ValidatorData } from '../types';

export const numberBuilder = (meta: CompilerMeta, { error }: ValidatorData) => number(meta.errors[error]);