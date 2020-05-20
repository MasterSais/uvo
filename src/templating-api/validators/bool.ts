import { V_BLN } from '@lib/base-api/names';
import { check, NO_PARAMS } from '@lib/templating-api/errors';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';
import { l_assign, l_content, l_else, l_equal, l_error, l_if, l_ifBody, l_or, l_quoted } from '@lib/templating-api/units';
import { setMeta } from '@lib/templating-api/utilities';

export const boolTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, NO_PARAMS);

  props = setMeta(props, { validator: V_BLN });

  return ([
    l_if(
      l_or(
        ...['true', '1', l_quoted('true'), l_quoted('1')].map(value => l_equal(props.in, value))
      )
    ),
    l_ifBody(
      l_assign(props.out, 'true'),
      ...l_content({ ...props, in: props.out })
    ),
    l_else(),
    l_if(
      l_or(
        ...['false', '0', l_quoted('false'), l_quoted('0')].map(value => l_equal(props.in, value))
      )
    ),
    l_ifBody(
      l_assign(props.out, 'false'),
      ...l_content({ ...props, in: props.out })
    ),
    l_else(),
    l_ifBody(
      ...l_error(props, data.error)
    )
  ]);
};