import { check, COMMA_SEPARATED_PARAMS } from '@lib/templating-api/compiler/errors';
import { l_and, l_assign, l_content, l_else, l_if, l_ifBody, l_onError } from '@lib/templating-api/compiler/units';
import { extract } from '@lib/templating-api/compiler/utilities';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';

const condition = (template: string) => (value: string, param: string) => (
  template.replace('$0', value).replace('$1', param)
);

const compareTemplates = {
  '>=': condition('$0>=$1'),
  '<': condition('$0<$1'),
  '<=': condition('$0<=$1'),
  '>': condition('$0>$1'),
  '=': condition('$0===$1'),
  '!=': condition('$0!==$1'),
  '%': condition('$0%$1===0'),
  '!%': condition('$0%$1!==0'),
  '->': condition('$1.indexOf($0)>=0'),
  '!->': condition('$1.indexOf($0)<0'),
  '*': condition('$1.test($0)'),
  '!*': condition('!$1.test($0)')
};

const lengthTemplates = {
  '>=': condition('$0.length>=$1'),
  '<': condition('$0.length<$1'),
  '<=': condition('$0.length<=$1'),
  '>': condition('$0.length>$1'),
  '=': condition('$0.length===$1'),
  '!=': condition('$0.length!==$1'),
  '%': condition('$0.length%$1===0'),
  '!%': condition('$0.length%$1!==0')
};

const comparatorTemplate = (comparators: Record<string, (value: string, param: string) => string>) => (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, COMMA_SEPARATED_PARAMS);

  const conditions: Array<string> = [];

  for (let i = 0; i < data.params.length; i += 3) {
    conditions.push(
      comparators[data.params[i].value](
        props.in,
        extract(props.cmps, data.params[i + 1])()
      )
    );
  }

  return ([
    l_if(
      l_and(...conditions)
    ),
    l_ifBody(
      ...l_content(props)
    ),
    l_else(),
    l_ifBody(
      l_assign(props.out, l_onError(props, data.error))
    )
  ]);
};

export const compareTemplate = comparatorTemplate(compareTemplates);

export const lengthTemplate = comparatorTemplate(lengthTemplates);