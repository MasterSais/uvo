import { Validator } from '@lib/base-api/types';
import { l_errors, l_injections, l_return, l_value } from '@lib/templating-api/compiler/units';
import { numberTemplate } from '@lib/templating-api/compiler/validators/number';
import { objectTemplate } from '@lib/templating-api/compiler/validators/object';
import { stringTemplate } from '@lib/templating-api/compiler/validators/string';
import { VLD } from '@lib/templating-api/lexemes';
import { Errors, Injections, ValidatorData } from '@lib/templating-api/types';

const components = new Map([
  [VLD.code, {
    'object': objectTemplate,
    'number': numberTemplate,
    'string': stringTemplate
  }]
]);

const root = (semanticTree: Array<ValidatorData>) => {
  let code = 0;

  const parts: Array<any> = [];

  semanticTree.forEach(node => (
    parts.push(
      ...components.get(node.code)[node.value](
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
  console.warn(root(semanticTree));

  const validator = new Function(l_value(), l_injections(), l_errors(), root(semanticTree));

  return (
    (injections?: Injections, errors?: Errors) => (
      (value: T) => (
        validator(value, injections, errors)
      )
    )
  );
};