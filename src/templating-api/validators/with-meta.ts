import { check, NO_PARAMS, ONE_PARAM } from '@lib/templating-api/errors';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';
import { l_define, l_object } from '@lib/templating-api/units';

export const withMetaTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, NO_PARAMS | ONE_PARAM);

  props.meta = {
    path: [],
    params: [],
    validator: null,
    deps: props.name()
  };

  return ([
    l_define(props.meta.deps, l_object())
  ]);
};