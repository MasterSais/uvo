import { setDep } from '@lib/classic-api/spreaders/set-dep';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const setDepBuilder = (_meta: CompilerMeta, { value }: ValidatorData) => setDep(value);