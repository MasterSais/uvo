import { check, SEQUENCE_PARAMS } from '@lib/templating-api/compiler/errors';
import { l_assign, l_content, l_else, l_for, l_if, l_ifBody, l_isArray, l_onError, l_slice } from '@lib/templating-api/compiler/units';
import { chain } from '@lib/templating-api/compiler/utilities';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';

export const arrayTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, SEQUENCE_PARAMS);

  return ([
    l_if(
      l_isArray(props.in)
    ),
    l_ifBody(
      ...data.params
        ?
        [
          l_assign(props.out, l_slice(props.in)),
          l_for(props.out, (elem: string) => chain({ ...props, in: elem, out: elem }, data.params)),
          ...l_content({ ...props, in: props.out })
        ]
        :
        [],
    ),
    l_else(),
    l_ifBody(
      l_assign(props.out, l_onError(props, data.error))
    )
  ]);
};