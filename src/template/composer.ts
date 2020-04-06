import { consecutive } from '../groupers/consecutive';
import { Validator } from '../types';
import { CNT } from './lexemes';
import { CompilerMeta, Injections, ValidatorData } from './types';
import { extractValidator } from './validators/utilities';

const wrapValidator = (validator: Validator<any>, containers: Array<Validator<any>>) => (
  containers.reduce((wrapped, wrappee) => wrappee(wrapped), validator)
);

export const composer = <T, R>(semanticTree: Array<ValidatorData>): ((injections?: Injections, errors?: Injections) => Validator<T, R>) => {
  const validators: Array<Validator<any>> = [];

  const containers: Array<Validator<any>> = [];

  const meta: CompilerMeta = { injections: {}, errors: {} };

  for (const node of semanticTree) {
    node.code === CNT.code
      ? containers.push(extractValidator(meta, node))
      : validators.push(extractValidator(meta, node));
  }

  const wrapped = wrapValidator(
    (
      validators.length > 1
        ? consecutive(...validators)
        : validators[0]
    ),
    containers
  );

  return (
    (injections: Injections = {}, errors: Injections = {}) => (
      meta.injections = injections,
      meta.errors = errors,
      wrapped
    )
  );
};