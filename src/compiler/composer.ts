import { consecutive } from '../groupers/consecutive';
import { Validator } from '../types';
import { CompilerMeta, Injections, ValidatorData } from './types';
import { getValidator } from './validators';

export const composer = (semanticTree: Array<ValidatorData>) => {
  const validators: Array<Validator<any>> = [];

  const meta: CompilerMeta = { injections: {} };

  for (const node of semanticTree) {
    validators.push(getValidator(meta, node));
  }

  if (validators.length > 1) {
    return (injections: Injections) => (meta.injections = injections, consecutive(...validators));
  }

  return (injections: Injections) => (meta.injections = injections, validators[0]);
};