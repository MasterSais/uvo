import { check, NO_PARAMS } from '@lib/templating-api/compiler/errors';
import { l_and, l_assign, l_if, l_ifBody, l_content, l_else, l_emptyString, l_group, l_isBoolean, l_isFinite, l_isNumber, l_isString, l_notEqual, l_onError, l_or, l_toNumber, l_trim } from '@lib/templating-api/compiler/units';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';

export const numberTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, NO_PARAMS);

  return ([
    l_if(
      l_and(
        l_isFinite(props.in),
        l_group(
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
      l_assign(props.out, l_onError(props, data.error))
    )
  ]);
};