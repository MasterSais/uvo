import { consecutive } from '../groupers/consecutive';
import { getValidator } from './validators';

export const composer = (semanticTree: Array<any>) => {
  const validators = [];

  for (const node of semanticTree) {
    validators.push(getValidator(node));
  }

  if (validators.length > 1) {
    return consecutive(...validators);
  }

  return validators[0];
};