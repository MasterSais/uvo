import { check, NO_PARAMS, ONE_PARAM } from '@lib/templating-api/errors';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';

export const withMetaTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, NO_PARAMS | ONE_PARAM);

  props.meta = {
    path: [],
    params: [],
    validator: null
  };

  return ([]);
};