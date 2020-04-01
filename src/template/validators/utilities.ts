import { callee } from '../../utilities';
import { INJ, REF, SQ, VL, VLD } from '../lexemes';
import { CompilerMeta, Lexeme, ValidatorData } from '../types';
import { validatorBase } from '../validators-base';
import { setDepBuilder } from './set-dep';

export const extractParam = (meta: CompilerMeta, [p1, p2]: Array<Lexeme>) => (
  (
    p1.code === INJ.code && (() => callee(meta.injections[p1.value])())
  ) || (
    p1.code === SQ.code && callee(p2.value)
  ) || (
    p1.code === VL.code && !isNaN(+p1.value) && callee(+p1.value)
  ) || (
    p1.code === REF.code && { code: REF.code, value: p1.value }
  ) || null
);

export const getValidator = (meta: CompilerMeta, data: ValidatorData) => {
  const validator = (
    data.code === VLD.code && validatorBase.get(data.value) ||
    data.code === REF.code && setDepBuilder
  ) || null;

  if (!validator) {
    throw `Unsupported validator name '${data.value}'`;
  }

  return validator(meta, data);
};