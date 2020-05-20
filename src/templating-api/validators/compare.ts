import { check, COMMA_SEPARATED_PARAMS } from '@lib/templating-api/errors';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';
import { l_and, l_compare, l_content, l_else, l_embrace, l_emptyString, l_equal, l_error, l_if, l_ifBody, l_indexOf, l_isNumber, l_length, l_not, l_notEqual, l_null, l_or, l_test, l_typeof, l_undefined } from '@lib/templating-api/units';
import { extract } from '@lib/templating-api/utilities';

const condition = (template: string) => (value: string, param: string) => (
  template.replace(/\$0/g, value).replace(/\$1/g, param)
);

const oneTypeTemplate = (comparator: string) => condition(
  l_and(
    l_equal(
      l_typeof('$0'), l_typeof('$1')
    ),
    l_compare('$0', '$1', comparator)
  )
);

const multipleTemplate = (comparator: (...args: any) => string) => condition(
  l_and(
    l_isNumber('$0'),
    comparator(l_compare('$0', '$1', '%'), '0')
  )
);

const compareTemplates = {
  '>=': oneTypeTemplate('>='),
  '<': oneTypeTemplate('<'),
  '<=': oneTypeTemplate('<='),
  '>': oneTypeTemplate('>'),
  '=': condition(l_equal('$0', '$1')),
  '!=': condition(l_notEqual('$0', '$1')),
  '%': multipleTemplate(l_equal),
  '!%': multipleTemplate(l_notEqual),
  '->': condition(l_compare(l_indexOf('$1', '$0'), '0', '>=')),
  '!->': condition(l_compare(l_indexOf('$1', '$0'), '0', '<')),
  '*': condition(l_test('$1', '$0')),
  '!*': condition(l_not(l_test('$1', '$0')))
};

const lengthyTemplate = (comparator: (...args: any) => string) => condition(
  l_and(
    l_notEqual('$0', l_null()),
    l_notEqual('$0', l_undefined()),
    l_isNumber(l_length('$0')),
    comparator(l_length('$0'))
  )
);

const lengthTemplates = {
  '>=': lengthyTemplate(v => l_compare(v, '$1', '>=')),
  '<': lengthyTemplate(v => l_compare(v, '$1', '<')),
  '<=': lengthyTemplate(v => l_compare(v, '$1', '<=')),
  '>': lengthyTemplate(v => l_compare(v, '$1', '>')),
  '=': lengthyTemplate(v => l_compare(v, '$1', '===')),
  '!=': lengthyTemplate(v => l_compare(v, '$1', '!==')),
  '%': lengthyTemplate(v => l_compare(l_compare(v, '$1', '%'), '0', '===')),
  '!%': lengthyTemplate(v => l_compare(l_compare(v, '$1', '%'), '0', '!=='))
};

const constTemplates = {
  '=def': condition(
    l_notEqual('$0', l_undefined())
  ),
  '=emp': condition(
    l_embrace(
      l_or(
        l_equal('$0', l_undefined()),
        l_equal('$0', l_null()),
        l_equal('$0', l_emptyString())
      )
    )
  ),
  '!=emp': condition(
    l_and(
      l_notEqual('$0', l_undefined()),
      l_notEqual('$0', l_null()),
      l_notEqual('$0', l_emptyString())
    )
  )
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
        extract(props.components, data.params[i + 1])().join(l_emptyString())
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