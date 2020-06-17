import { check, NO_PARAMS, ONE_PARAM } from '@lib/templating-api/errors';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';
import { l_assign, l_injections, l_isFunction, l_quoted, l_square } from '@lib/templating-api/units';
import { extract } from '@lib/templating-api/utilities';

export const injectionTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, NO_PARAMS | ONE_PARAM);

  const injection = l_injections() + l_square(l_quoted(data.value));

  const param = (
    data.params
      ? extract(props.components, data.params[0])({ ...props, internal: true }, data.params[0]).join('')
      : props.in
  );

  const expression = `(${l_isFunction(injection)}?${injection}(${param}):${injection})`;

  return (
    props.internal ? [expression] : [l_assign(props.out, expression)]
  );
};