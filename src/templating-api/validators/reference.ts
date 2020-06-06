import { check, NO_PARAMS, ONE_PARAM } from '@lib/templating-api/errors';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';
import { l_assign, l_quoted, l_square } from '@lib/templating-api/units';
import { extract } from '@lib/templating-api/utilities';

export const referenceTemplate = (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, NO_PARAMS | ONE_PARAM);

  if (!props.meta) {
    throw 'Meta not provided for reference API';
  }

  return (
    props.internal ?
      [
        props.meta.deps + l_square(l_quoted(data.value))
      ]
      :
      [
        l_assign(
          props.meta.deps + l_square(
            data.value
              ? l_quoted(data.value)
              : props.meta.path[props.meta.path.length - 1] as string
          ),
          (
            data.params && data.params[0]
              ? extract(props.components, data.params[0])(props, data.params[0]).join('')
              : props.in
          )
        )
      ]
  );
};