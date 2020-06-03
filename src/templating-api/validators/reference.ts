import { check, NO_PARAMS, ONE_PARAM } from '@lib/templating-api/errors';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';
import { l_assign } from '@lib/templating-api/units';

export const referenceTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, NO_PARAMS | ONE_PARAM);

  if (!props.meta) {
    throw 'Meta not provided for reference API';
  }

  return ([
    l_assign(props.meta.deps + '[' + data.params[0].value + ']', props.in)
  ]);
};