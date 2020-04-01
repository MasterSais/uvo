import { setDep } from '../../spreaders/set-dep';
import { CompilerMeta, ValidatorData } from '../types';

export const setDepBuilder = (_meta: CompilerMeta, { value }: ValidatorData) => setDep(value);