import { check, FIRST_COMMA_PARAMS } from '@lib/templating-api/errors';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';
import { l_assign, l_content, l_else, l_emptyString, l_equal, l_if, l_ifBody, l_null, l_or, l_undefined } from '@lib/templating-api/units';
import { chain, extract } from '@lib/templating-api/utilities';

export const defaultTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, FIRST_COMMA_PARAMS);

  const [fallback, , ...nodes] = data.params;

  const fallbackTemplate = extract(props.components, fallback)({ ...props, internal: true }, fallback).join('');

  return ([
    l_if(
      l_or(
        l_equal(props.in, l_undefined()),
        l_equal(props.in, l_null()),
        l_equal(props.in, l_emptyString())
      )
    ),
    l_ifBody(
      l_assign(props.out, fallbackTemplate)
    ),
    l_else(),
    l_ifBody(
      ...chain(props, nodes)
    ),
    ...l_content({ ...props, in: props.out })
  ]);
};