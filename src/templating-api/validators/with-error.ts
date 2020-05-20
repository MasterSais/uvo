import { CompilerProps } from '@lib/templating-api/types';
import { l_assign, l_define, l_errorsCounter, l_length } from '@lib/templating-api/units';

export const withErrorTemplate = (props: CompilerProps): Array<string> => {
  props.errors = props.name();

  return ([
    l_define(l_errorsCounter(), '0'),
    l_define(props.errors, '[]'),
    l_assign(l_length(props.errors), '16')
  ]);
};