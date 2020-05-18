import { check, COMMA_SEPARATED_PARAMS } from '@lib/templating-api/compiler/errors';
import { l_and, l_content, l_else, l_error, l_if, l_ifBody } from '@lib/templating-api/compiler/units';
import { extract } from '@lib/templating-api/compiler/utilities';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';

const condition = (template: string) => (value: string, param: string) => (
  template.replace(/\$0/g, value).replace(/\$1/g, param)
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

const constTemplates = {
  '=def': condition('$0!==undefined'),
  '=emp': condition('($0===undefined||$0===null||$0===\'\')'),
  '!=emp': condition('$0!==undefined&&$0!==null&&$0!==\'\'')
};

const comparatorTemplate = (comparators: Record<string, (value: string, param: string) => string>) => (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, COMMA_SEPARATED_PARAMS);

  const conditions: Array<string> = [];

  for (let i = 0; i < data.params.length; i += 3) {
    conditions.push(
      (
        constTemplates[data.params[i].value + data.params[i + 1].value] ||
        comparators[data.params[i].value]
      )(
        props.in,
        extract(props.cmps, data.params[i + 1])().join('')
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
      ...l_error(props, data.error)
    )
  ]);
};

export const compareTemplate = comparatorTemplate(compareTemplates);

export const lengthTemplate = comparatorTemplate(lengthTemplates);