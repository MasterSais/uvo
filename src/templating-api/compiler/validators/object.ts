import { l_and, l_assign, l_condition, l_conditionBody, l_conditionElse, l_define, l_isObject, l_object, l_onError } from '@lib/templating-api/compiler/units';
import { DLM } from '@lib/templating-api/lexemes';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';

const passObjectParams = (props: CompilerProps, params: Array<ValidatorData>): Array<string> => {
  let field = null;

  const parts: Array<string> = [];

  for (let i = -1; i < params.length; i++) {
    if (i === -1 || params[i].code === DLM.code) {
      if (params[i + 1]) {
        field = params[i + 1].value;
      }

      i++;

      continue;
    }

    parts.push(
      ...props.cmps.get(params[i].code)[params[i].value](
        {
          ...props,
          in: `${props.in}.${field}`,
          out: `${props.out}.${field}`
        },
        params[i]
      )
    );
  }

  return parts;
};

export const objectTemplate = (props: CompilerProps, { params, error }: ValidatorData): Array<string> => {
  const code = props.name();

  return [
    l_condition(
      props.in,
      l_and(),
      l_isObject(props.in)
    ),
    l_conditionBody(
      l_define(code, l_object()),
      ...passObjectParams({ ...props, out: code }, params),
      l_assign(props.out, code)
    ),
    l_conditionElse(
      l_assign(props.out, l_onError(props, error))
    )
  ];
};