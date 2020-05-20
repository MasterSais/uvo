import { Validator } from '@lib/base-api/types';
import { CNT, GR, VLD } from '@lib/templating-api/lexemes';
import { CompilerProps, Errors, Injections, ValidatorData } from '@lib/templating-api/types';
import { l_errors, l_injections, l_return, l_value } from '@lib/templating-api/units';
import { chain, extract } from '@lib/templating-api/utilities';
import { arrayTemplate } from '@lib/templating-api/validators/array';
import { boolTemplate } from '@lib/templating-api/validators/bool';
import { compareTemplate, lengthTemplate } from '@lib/templating-api/validators/compare';
import { dateTemplate } from '@lib/templating-api/validators/date';
import { defaultTemplate } from '@lib/templating-api/validators/default';
import { fallbackTemplate } from '@lib/templating-api/validators/fallback';
import { numberTemplate } from '@lib/templating-api/validators/number';
import { objectTemplate } from '@lib/templating-api/validators/object';
import { stringTemplate } from '@lib/templating-api/validators/string';
import { withErrorTemplate } from '@lib/templating-api/validators/with-error';
import { withMetaTemplate } from '@lib/templating-api/validators/with-meta';

const components = new Map([
  [VLD.code, {
    'object': objectTemplate,
    'o': objectTemplate,
    'number': numberTemplate,
    'n': numberTemplate,
    'string': stringTemplate,
    's': stringTemplate,
    'date': dateTemplate,
    'd': dateTemplate,
    'bool': boolTemplate,
    'b': boolTemplate,
    'compare': compareTemplate,
    'c': compareTemplate,
    'length': lengthTemplate,
    'l': lengthTemplate,
    'array': arrayTemplate,
    'a': arrayTemplate,
    'async': null,
    'p': null,
    'wait': null,
    'w': null,
    'fallback': fallbackTemplate,
    'f': fallbackTemplate,
    'default': defaultTemplate
  }],
  [CNT.code, {
    'error': withErrorTemplate,
    'e': withErrorTemplate,
    'meta': withMetaTemplate,
    'm': withMetaTemplate,
    'promise': null,
    'p': null
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
    components,
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
    ...containers.map(
      container => extract(components, container)(props).join('')
    ),
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