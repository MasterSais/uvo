import { Validator } from '@lib/base-api/types';
import { l_errors, l_injections, l_return, l_value } from '@lib/templating-api/compiler/units';
import { chain, extract } from '@lib/templating-api/compiler/utilities';
import { arrayTemplate } from '@lib/templating-api/compiler/validators/array';
import { boolTemplate } from '@lib/templating-api/compiler/validators/bool';
import { compareTemplate, lengthTemplate } from '@lib/templating-api/compiler/validators/compare';
import { dateTemplate } from '@lib/templating-api/compiler/validators/date';
import { defaultTemplate } from '@lib/templating-api/compiler/validators/default';
import { fallbackTemplate } from '@lib/templating-api/compiler/validators/fallback';
import { numberTemplate } from '@lib/templating-api/compiler/validators/number';
import { objectTemplate } from '@lib/templating-api/compiler/validators/object';
import { stringTemplate } from '@lib/templating-api/compiler/validators/string';
import { withErrorTemplate } from '@lib/templating-api/compiler/validators/with-error';
import { CNT, GR, VLD } from '@lib/templating-api/lexemes';
import { CompilerProps, Errors, Injections, ValidatorData } from '@lib/templating-api/types';

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
    'fallback': fallbackTemplate,
    'default': defaultTemplate
  }],
  [CNT.code, {
    'error': withErrorTemplate,
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

  const props: CompilerProps = {
    in: l_value(),
    out: l_value(),
    cmps: components,
    name: () => `_${(code++).toString(26)}`
  };

  const validators: Array<ValidatorData> = [];

  const containers: Array<ValidatorData> = [];

  for (const node of semanticTree) {
    node.code === CNT.code
      ? containers.push(node)
      : validators.push(node);
  }

  const parts: Array<any> = [
    ...containers.map(container => extract(components, container)(props).join('')),
    ...chain(props, validators),
    ...l_return(props)
  ];

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