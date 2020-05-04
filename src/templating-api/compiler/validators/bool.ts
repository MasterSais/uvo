import { check, NO_PARAMS } from '@lib/templating-api/compiler/errors';
import { l_assign, l_if, l_ifBody, l_content, l_else, l_equal, l_onError, l_or } from '@lib/templating-api/compiler/units';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';

export const boolTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, NO_PARAMS);

  return ([
    l_if(
      l_or(
        ...['true', '1', '"true"', '"1"'].map(value => l_equal(props.in, value))
      )
    ),
    l_ifBody(
      l_assign(props.out, 'true'),
      ...l_content({ ...props, in: props.out })
    ),
    l_else(),
    l_if(
      l_or(
        ...['false', '0', '"false"', '"0"'].map(value => l_equal(props.in, value))
      )
    ),
    l_ifBody(
      l_assign(props.out, 'false'),
      ...l_content({ ...props, in: props.out })
    ),
    l_else(),
    l_ifBody(
      l_assign(props.out, l_onError(props, data.error))
    )
  ]);
};