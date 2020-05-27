import { V_CMP, V_LEN } from '@lib/base-api';
import { check, COMMA_SEPARATED_PARAMS } from '@lib/templating-api/errors';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';
import { l_and, l_compare, l_content, l_else, l_embrace, l_emptyString, l_equal, l_error, l_if, l_ifBody, l_indexOf, l_isNumber, l_length, l_not, l_notEqual, l_null, l_or, l_test, l_typeof, l_undefined, l_quoted } from '@lib/templating-api/units';
import { extract, setMeta } from '@lib/templating-api/utilities';

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
    pushMeta(V_CMP, ['=', 'def']),
    true
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
    pushMeta(V_CMP, ['=', 'emp']),
    true
  ],
  '!=emp': [
    condition(
      l_and(
        l_notEqual('$0', l_undefined()),
        l_notEqual('$0', l_null()),
        l_notEqual('$0', l_emptyString())
      )
    ),
    pushMeta(V_CMP, ['!=', 'emp']),
    true
  ]
};

const comparatorTemplate = (comparators: Record<string, ComparatorTemplate>) => (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, COMMA_SEPARATED_PARAMS);

  const conditions: Array<string> = [];

  const meta: { validator?: string; params?: Array<any> } = {
    params: []
  };

  for (let i = 0; i < data.params.length; i += 3) {
    const [comparator, info, constant] = (
      constTemplates[data.params[i].value + data.params[i + 1].value] ||
      comparators[data.params[i].value]
    );

    const param = extract(props.components, data.params[i + 1])().join(l_emptyString());

    meta.validator = info.validator;
    meta.params = meta.params.concat(info.params);

    if (!constant) {
      meta.params = meta.params.concat(param);
    }

    conditions.push(
      comparator(props.in, param)
    );
  }

  props = setMeta(props, meta);

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