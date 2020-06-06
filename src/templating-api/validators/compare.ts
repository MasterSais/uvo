import { V_CMP, V_LEN } from '@lib/base-api';
import { check, COMMA_SEPARATED_PARAMS } from '@lib/templating-api/errors';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';
import { l_and, l_compare, l_content, l_else, l_embrace, l_emptyString, l_equal, l_error, l_if, l_ifBody, l_indexOf, l_isNumber, l_length, l_not, l_notEqual, l_null, l_or, l_quoted, l_test, l_typeof, l_undefined } from '@lib/templating-api/units';
import { extract, getRefs, setMeta } from '@lib/templating-api/utilities';

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

const pushMeta = (validator: string, params: Array<any> = []) => ({
  validator, params: params.map(param => l_quoted(param))
});

type ComparatorTemplate = [(value: string, param: string) => string, { validator: string, params?: Array<any> }];

const compareTemplates: Record<string, ComparatorTemplate> = {
  '>=': [oneTypeTemplate('>='), pushMeta(V_CMP, ['>='])],
  '<': [oneTypeTemplate('<'), pushMeta(V_CMP, ['<'])],
  '<=': [oneTypeTemplate('<='), pushMeta(V_CMP, ['<='])],
  '>': [oneTypeTemplate('>'), pushMeta(V_CMP, ['>'])],
  '=': [condition(l_equal('$0', '$1')), pushMeta(V_CMP, ['='])],
  '!=': [condition(l_notEqual('$0', '$1')), pushMeta(V_CMP, ['!='])],
  '%': [multipleTemplate(l_equal), pushMeta(V_CMP, ['%'])],
  '!%': [multipleTemplate(l_notEqual), pushMeta(V_CMP, ['!%'])],
  '->': [condition(l_compare(l_indexOf('$1', '$0'), '0', '>=')), pushMeta(V_CMP, ['->'])],
  '!->': [condition(l_compare(l_indexOf('$1', '$0'), '0', '<')), pushMeta(V_CMP, ['!->'])],
  '*': [condition(l_test('$1', '$0')), pushMeta(V_CMP, ['*'])],
  '!*': [condition(l_not(l_test('$1', '$0'))), pushMeta(V_CMP, ['!*'])]
};

const lengthyTemplate = (comparator: (...args: any) => string) => condition(
  l_and(
    l_notEqual('$0', l_null()),
    l_notEqual('$0', l_undefined()),
    l_isNumber(l_length('$0')),
    comparator(l_length('$0'))
  )
);

const lengthTemplates: Record<string, ComparatorTemplate> = {
  '>=': [lengthyTemplate(v => l_compare(v, '$1', '>=')), pushMeta(V_LEN, ['>='])],
  '<': [lengthyTemplate(v => l_compare(v, '$1', '<')), pushMeta(V_LEN, ['<'])],
  '<=': [lengthyTemplate(v => l_compare(v, '$1', '<=')), pushMeta(V_LEN, ['<='])],
  '>': [lengthyTemplate(v => l_compare(v, '$1', '>')), pushMeta(V_LEN, ['>'])],
  '=': [lengthyTemplate(v => l_compare(v, '$1', '===')), pushMeta(V_LEN, ['='])],
  '!=': [lengthyTemplate(v => l_compare(v, '$1', '!==')), pushMeta(V_LEN, ['!='])],
  '%': [lengthyTemplate(v => l_compare(l_compare(v, '$1', '%'), '0', '===')), pushMeta(V_LEN, ['%'])],
  '!%': [lengthyTemplate(v => l_compare(l_compare(v, '$1', '%'), '0', '!==')), pushMeta(V_LEN, ['!%'])]
};

const constTemplates = {
  '=def': [
    condition(
      l_notEqual('$0', l_undefined())
    ),
    pushMeta(V_CMP, ['='])
  ],
  '=emp': [
    condition(
      l_embrace(
        l_or(
          l_equal('$0', l_undefined()),
          l_equal('$0', l_null()),
          l_equal('$0', l_emptyString())
        )
      )
    ),
    pushMeta(V_CMP, ['='])
  ],
  '!=emp': [
    condition(
      l_and(
        l_notEqual('$0', l_undefined()),
        l_notEqual('$0', l_null()),
        l_notEqual('$0', l_emptyString())
      )
    ),
    pushMeta(V_CMP, ['!='])
  ]
};

const comparatorTemplate = (comparators: Record<string, ComparatorTemplate>) => (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, COMMA_SEPARATED_PARAMS);

  const comparatorDescention = ([param, paramValue, , ...restParams]: Array<ValidatorData>): Array<string> => {
    if (!param) {
      return l_content(props);
    }

    const [comparator, info] = (
      constTemplates[param.value + paramValue.value] ||
      comparators[param.value]
    );

    const value = extract(props.components, paramValue)({ ...props, internal: true }, paramValue).join(l_emptyString());

    props = setMeta(props, { ...info, params: info.params.concat(value) });

    const refs = getRefs(props, paramValue);

    const template = [
      l_if(
        comparator(props.in, value)
      ),
      l_ifBody(
        ...comparatorDescention(restParams)
      ),
      l_else(),
      l_ifBody(
        ...l_error(props, data.error)
      )
    ];

    return (
      refs.length > 0
        ? ([
          l_if(
            l_notEqual(refs.join(''), l_undefined())
          ),
          l_ifBody(
            ...template
          )
        ])
        : template
    );
  };

  return comparatorDescention(data.params);
};

export const compareTemplate = comparatorTemplate(compareTemplates);

export const lengthTemplate = comparatorTemplate(lengthTemplates);