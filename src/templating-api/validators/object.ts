import { V_OBJ } from '@lib/base-api';
import { check, COMMA_SEPARATED_PARAMS, SEQUENCE_PARAMS } from '@lib/templating-api/errors';
import { DLM } from '@lib/templating-api/lexemes';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';
import { l_and, l_assign, l_content, l_define, l_else, l_error, l_if, l_ifBody, l_isObject, l_notEqual, l_null, l_object, l_quoted, l_undefined } from '@lib/templating-api/units';
import { chain, setMeta } from '@lib/templating-api/utilities';

const passObjectParams = (props: CompilerProps, params: Array<ValidatorData>): Array<string> => {
  const parts: Array<string> = [];

  const perNameParams: Array<[string, ...Array<ValidatorData>]> = [[params[0].value]];

  for (let i = 1; i < params.length; i++) {
    if (params[i].code === DLM.code) {
      if (++i !== params.length) {
        perNameParams.push([params[i].value]);
      }

      continue;
    }

    perNameParams[perNameParams.length - 1].push(params[i]);
  }

  for (const [field, ...nameParams] of perNameParams) {
    parts.push(
      ...chain(
        {
          ...setMeta(props, { path: l_quoted(field) }),
          in: `${props.in}.${field}`,
          out: `${props.out}.${field}`
        },
        nameParams
      )
    );
  }

  return parts;
};

export const objectTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, SEQUENCE_PARAMS | COMMA_SEPARATED_PARAMS);

  props = setMeta(props, { validator: V_OBJ });

  const result = props.name();

  return ([
    l_if(
      l_and(
        l_notEqual(props.in, l_null()),
        l_notEqual(props.in, l_undefined()),
        l_isObject(props.in)
      )
    ),
    l_ifBody(
      ...(
        data.params
          ?
          [
            l_define(result, l_object()),
            ...passObjectParams({ ...props, out: result }, data.params),
            l_assign(props.out, result),
            ...l_content({ ...props, in: props.out })
          ]
          :
          [
            l_assign(props.out, props.in)
          ]
      )
    ),
    l_else(),
    l_ifBody(
      ...l_error(props, data.error)
    )
  ]);
};