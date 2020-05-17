import { check, NO_PARAMS } from '@lib/templating-api/compiler/errors';
import { l_and, l_assign, l_content, l_define, l_else, l_error, l_if, l_ifBody, l_isNaN, l_not, l_notEqual, l_toDate, l_valueOf } from '@lib/templating-api/compiler/units';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';

export const dateTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, NO_PARAMS);

  const date = props.name();

  return ([
    l_if(
      l_and(
        l_notEqual(props.in, null),
        l_notEqual(props.in, undefined)
      )
    ),
    l_ifBody(
      l_define(date, l_toDate(props.in)),
      l_if(
        l_not(l_isNaN(date))
      ),
      l_ifBody(
        l_assign(props.out, l_valueOf(date)),
        ...l_content({ ...props, in: props.out })
      ),
      l_else(),
      l_ifBody(
        ...l_error(props, data.error)
      )
    ),
    l_else(),
    l_ifBody(
      ...l_error(props, data.error)
    )
  ]);
};