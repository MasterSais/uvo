import { check, FIRST_COMMA_PARAMS } from '@lib/templating-api/errors';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';
import { l_assign, l_content, l_equal, l_if, l_ifBody, l_null } from '@lib/templating-api/units';
import { chain, extract } from '@lib/templating-api/utilities';

export const fallbackTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, FIRST_COMMA_PARAMS);

  const [fallback, , ...nodes] = data.params;

  const fallbackTemplate = extract(props.components, fallback)({ ...props, internal: true }, fallback).join('');

  return ([
    ...chain(props, nodes),
    l_if(
      l_equal(props.out, l_null())
    ),
    l_ifBody(
      l_assign(props.out, fallbackTemplate)
    ),
    ...l_content({ ...props, in: props.out })
  ]);
};