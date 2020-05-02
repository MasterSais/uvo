import { l_assign, l_condition, l_conditionBody, l_conditionElse, l_isBoolean, l_isNumber, l_isString, l_onError, l_or, l_toString } from '@lib/templating-api/compiler/units';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';

export const stringTemplate = (props: CompilerProps, { error }: ValidatorData): Array<string> => (
  [
    l_condition(
      l_isString(props.in),
      l_or(),
      l_isNumber(props.in),
      l_or(),
      l_isBoolean(props.in)
    ),
    l_conditionBody(
      l_assign(props.out, l_toString(props.in))
    ),
    l_conditionElse(
      l_assign(props.out, l_onError(props, error))
    )
  ]
);