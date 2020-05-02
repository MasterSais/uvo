import { l_and, l_assign, l_condition, l_conditionBody, l_conditionElse, l_define, l_emptyString, l_group, l_isBoolean, l_isDefined, l_isFinite, l_isNumber, l_isString, l_notEqual, l_onError, l_or, l_toNumber, l_trim } from '@lib/templating-api/compiler/units';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';

export const numberTemplate = (props: CompilerProps, { error }: ValidatorData): Array<string> => {
  const code = props.name();

  return [
    l_condition(
      l_isFinite(props.in),
      l_and(),
      l_group(
        l_isNumber(props.in),
        l_or(),
        l_isString(props.in),
        l_and(),
        l_notEqual(l_trim(props.in), l_emptyString()),
        l_or(),
        l_isBoolean(props.in),
      )
    ),
    l_conditionBody(
      l_define(code, l_toNumber(props.in)),
      l_condition(
        l_isDefined(code)
      ),
      l_conditionBody(
        l_assign(props.out, code)
      ),
      l_conditionElse(
        l_assign(props.out, l_onError(props, error))
      )
    ),
    l_conditionElse(
      l_assign(props.out, l_onError(props, error))
    )
  ];
};