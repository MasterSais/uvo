import { V_ARR } from '@lib/base-api';
import { check, SEQUENCE_PARAMS } from '@lib/templating-api/errors';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';
import { l_assign, l_content, l_else, l_error, l_for, l_if, l_ifBody, l_isArray, l_slice } from '@lib/templating-api/units';
import { chain, setMeta } from '@lib/templating-api/utilities';

export const arrayTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, SEQUENCE_PARAMS);

  props = setMeta(props, { validator: V_ARR });

  const index = props.name();

  return ([
    l_if(
      l_isArray(props.in)
    ),
    l_ifBody(
      ...data.params
        ?
        [
          l_assign(props.out, l_slice(props.in)),
          l_for(props.out, index, elem => chain({ ...setMeta(props, { path: index }), in: elem, out: elem }, data.params)),
          ...l_content({ ...props, in: props.out })
        ]
        :
        [],
    ),
    l_else(),
    l_ifBody(
      ...l_error(props, data.error)
    )
  ]);
};