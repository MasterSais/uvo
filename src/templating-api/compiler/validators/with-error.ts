import { l_define } from '@lib/templating-api/compiler/units';
import { CompilerProps } from '@lib/templating-api/types';

export const withErrorTemplate = (props: CompilerProps): Array<string> => {
  props.err = props.name();

  return ([
    l_define(props.err, '[]'),
    props.err + '.length=16;'
  ]);
};