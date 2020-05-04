import { check, NO_PARAMS } from '@lib/templating-api/compiler/errors';
import { l_assign, l_if, l_ifBody, l_content, l_else, l_isBoolean, l_isNumber, l_isString, l_onError, l_or, l_toString } from '@lib/templating-api/compiler/units';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';

export const stringTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, NO_PARAMS);

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
      l_assign(props.out, l_onError(props, data.error))
    )
  ]);
};