import { withErrors } from '../containers/with-errors';
import { withMeta } from '../containers/with-meta';
import { withPromise } from '../containers/with-promise';
import { consecutive } from '../groupers/consecutive';
import { Validator } from '../types';
import { CompilerMeta, Injections, ValidatorData } from './types';
import { getValidator } from './validators';

const wrapValidator = (containers: string, validator: Validator<any>) => {
  if (containers.indexOf('e') >= 0) {
    validator = withErrors(validator);
  }

  if (containers.indexOf('p') >= 0) {
    validator = withPromise(validator);
  }

  return validator;
};

export const composer = <T, R>(semanticTree: Array<ValidatorData>): ((containers?: string) => (injections: Injections) => Validator<T, R>) => {
  const validators: Array<Validator<any>> = [];

  const meta: CompilerMeta = { injections: {} };

  for (const node of semanticTree) {
    validators.push(getValidator(meta, node));
  }

  const composed = withMeta(
    validators.length > 1
      ? consecutive(...validators)
      : validators[0]
  );

  return (containers: string = '') => {
    const wrapped = wrapValidator(containers, composed);

    return (injections: Injections) => (meta.injections = injections, wrapped);
  };
};