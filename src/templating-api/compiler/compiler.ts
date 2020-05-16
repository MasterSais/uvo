import { Validator } from '@lib/base-api/types';
import { l_errors, l_injections, l_return, l_value } from '@lib/templating-api/compiler/units';
import { extract } from '@lib/templating-api/compiler/utilities';
import { arrayTemplate } from '@lib/templating-api/compiler/validators/array';
import { boolTemplate } from '@lib/templating-api/compiler/validators/bool';
import { compareTemplate, lengthTemplate } from '@lib/templating-api/compiler/validators/compare';
import { dateTemplate } from '@lib/templating-api/compiler/validators/date';
import { numberTemplate } from '@lib/templating-api/compiler/validators/number';
import { objectTemplate } from '@lib/templating-api/compiler/validators/object';
import { stringTemplate } from '@lib/templating-api/compiler/validators/string';
import { CNT, GR, VLD } from '@lib/templating-api/lexemes';
import { Errors, Injections, ValidatorData } from '@lib/templating-api/types';

const components = new Map([
  [VLD.code, {
    'object': objectTemplate,
    'number': numberTemplate,
    'string': stringTemplate,
    'date': dateTemplate,
    'bool': boolTemplate,
    'compare': compareTemplate,
    'length': lengthTemplate,
    'array': arrayTemplate,
    'async': null,
    'wait': null,
    'fallback': null,
    'default': null
  }],
  [CNT.code, {
    'error': null,
    'meta': null,
    'promise': null
  }],
  [GR.code, {
    '(': null,
    '[': null,
    '{': null
  }]
]);

export const interpreter = (semanticTree: Array<ValidatorData>) => {
  let code = 0;

  const parts: Array<any> = [];

  semanticTree.forEach(node => (
    parts.push(
      ...extract(components, node)(
        {
          in: l_value(),
          out: l_value(),
          cmps: components,
          name: () => `$${(code++).toString(26)}`
        },
        node
      )
    )
  ));

  parts.push(
    l_return(l_value())
  );

  return parts.join('');
};

export const compiler = <T, R>(semanticTree: Array<ValidatorData>): ((injections?: Injections, errors?: Errors) => Validator<T, R>) => {
  const validator = new Function(l_value(), l_injections(), l_errors(), interpreter(semanticTree));

  return (
    (injections?: Injections, errors?: Errors) => (
      (value: T) => (
        validator(value, injections, errors)
      )
    )
  );
};