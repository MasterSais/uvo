import { l_define, l_errorsCounter, l_assign } from '@lib/templating-api/compiler/units';
import { CompilerProps } from '@lib/templating-api/types';

export const withErrorTemplate = (props: CompilerProps): Array<string> => {
  props.err = props.name();

  return ([
    l_define(l_errorsCounter(), '0'),
    l_define(props.err, '[]'),
    l_assign(props.err + '.length', '16')
  ]);
};