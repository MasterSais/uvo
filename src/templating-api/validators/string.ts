import { V_STR } from '@lib/base-api';
import { check, NO_PARAMS } from '@lib/templating-api/errors';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';
import { l_assign, l_content, l_else, l_error, l_if, l_ifBody, l_isBoolean, l_isNumber, l_isString, l_or, l_toString } from '@lib/templating-api/units';
import { setMeta } from '@lib/templating-api/utilities';

export const stringTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, NO_PARAMS);

  props = setMeta(props, { validator: V_STR });

  return ([
    l_if(
      l_or(
        l_isString(props.in),
        l_isNumber(props.in),
        l_isBoolean(props.in)
      )
    ),
    l_ifBody(
      l_assign(props.out, l_toString(props.in)),
      ...l_content({ ...props, in: props.out })
    ),
    l_else(),
    l_ifBody(
      ...l_error(props, data.error)
    )
  ]);
};