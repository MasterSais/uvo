import { check, NO_PARAMS } from '@lib/templating-api/compiler/errors';
import { l_assign, l_condition, l_conditionBody, l_conditionElse, l_content, l_isBoolean, l_isNumber, l_isString, l_onError, l_or, l_toString } from '@lib/templating-api/compiler/units';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';

export const stringTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, NO_PARAMS);

  return ([
    l_condition(
      l_or(
        l_isString(props.in),
        l_isNumber(props.in),
        l_isBoolean(props.in)
      )
    ),
    l_conditionBody(
      l_assign(props.out, l_toString(props.in)),
      ...l_content({ ...props, in: props.out })
    ),
    l_conditionElse(
      l_assign(props.out, l_onError(props, data.error))
    )
  ]);
};