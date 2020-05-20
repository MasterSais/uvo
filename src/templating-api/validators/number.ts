import { V_NUM } from '@lib/base-api';
import { check, NO_PARAMS } from '@lib/templating-api/errors';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';
import { l_and, l_assign, l_content, l_else, l_embrace, l_emptyString, l_error, l_if, l_ifBody, l_isBoolean, l_isFinite, l_isNumber, l_isString, l_notEqual, l_or, l_toNumber, l_trim } from '@lib/templating-api/units';
import { setMeta } from '@lib/templating-api/utilities';

export const numberTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, NO_PARAMS);

  props = setMeta(props, { validator: V_NUM });

  return ([
    l_if(
      l_and(
        l_isFinite(props.in),
        l_embrace(
          l_or(
            l_isNumber(props.in),
            l_and(
              l_isString(props.in),
              l_notEqual(l_trim(props.in), l_emptyString())
            ),
            l_isBoolean(props.in)
          )
        )
      )
    ),
    l_ifBody(
      l_assign(props.out, l_toNumber(props.in)),
      ...l_content({ ...props, in: props.out })
    ),
    l_else(),
    l_ifBody(
      ...l_error(props, data.error)
    )
  ]);
};