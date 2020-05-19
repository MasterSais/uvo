import { check, FIRST_COMMA_PARAMS } from '@lib/templating-api/compiler/errors';
import { l_assign, l_content, l_equal, l_if, l_ifBody, l_null } from '@lib/templating-api/compiler/units';
import { chain, extract } from '@lib/templating-api/compiler/utilities';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';

export const fallbackTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, FIRST_COMMA_PARAMS);

  const [fallback, , ...nodes] = data.params;

  const fallbackTemplate = extract(props.components, fallback)().join('');

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