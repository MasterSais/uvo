import { Error, Validator } from '@lib/base-api/types';
import { DLM, VLD } from '@lib/templating-api/lexemes';
import { CompilerProps, Errors, Injections, ValidatorData } from '@lib/templating-api/types';

const l_value = () => 'value';

const l_injections = () => 'injections';

const l_errors = () => 'errors';

const l_or = () => '||';

const l_object = () => '{}';

const l_condition = (...conditions: Array<string>) => `if (${conditions.join('')})`;

const l_conditionBody = (...body: Array<string>) => `{${body.join('')}}`;

const l_conditionElse = (body: string) => `else {${body}}`;

const l_assign = (dest: string, src: string) => `${dest} = ${src};`;

const l_define = (code: string, value: string) => `const ${code} = ${value};`;

const l_isString = (input: string) => `typeof ${input} === 'string'`;

const l_toString = (input: string) => `${input} + ''`;

const l_isNumber = (input: string) => `typeof ${input} === 'number'`;

const l_isDefined = (input: string) => `!isNaN(${input})`;

const l_toNumber = (input: string) => `+${input}`;

const l_isBoolean = (input: string) => `typeof ${input} === 'boolean'`;

const l_isObject = (input: string) => `${input} && ${input}.constructor === Object`;

const l_onError = (props: CompilerProps, error: Error) => (
  props.err ? `(onError(${l_errors()}[${error}], meta), null)` : 'null'
);

const passObjectParams = (props: CompilerProps, params: Array<ValidatorData>): Array<string> => {
  let field = null;

  const parts: Array<string> = [];

  for (let i = -1; i < params.length; i++) {
    if (i === -1 || params[i].code === DLM.code) {
      if (params[i + 1]) {
        field = params[i + 1].value;
      }

      i++;

      continue;
    }

    parts.push(
      /* eslint-disable @typescript-eslint/no-use-before-define */
      ...components[params[i].code][params[i].value](
        {
          ...props,
          in: `${props.in}.${field}`,
          out: `${props.out}.${field}`
        },
        params[i]
      )
    );
  }

  return parts;
};

const components = {
  [VLD.code]: {
    'number': (props: CompilerProps, { error }: ValidatorData): Array<string> => {
      const code = props.name();

      return [
        l_condition(
          l_isString(props.in),
          l_or(),
          l_isNumber(props.in)
        ),
        l_conditionBody(
          l_define(code, l_toNumber(props.in)),
          l_condition(
            l_isDefined(code)
          ),
          l_conditionBody(
            l_assign(props.out, code)
          ),
          l_conditionElse(
            l_assign(props.out, l_onError(props, error))
          )
        ),
        l_conditionElse(
          l_assign(props.out, l_onError(props, error))
        )
      ];
    },
    'string': (props: CompilerProps, { error }: ValidatorData): Array<string> =>
      [
        l_condition(
          l_isString(props.in),
          l_or(),
          l_isNumber(props.in),
          l_or(),
          l_isBoolean(props.in)
        ),
        l_conditionBody(
          l_assign(props.out, l_toString(props.in))
        ),
        l_conditionElse(
          l_assign(props.out, l_onError(props, error))
        )
      ],
    'object': (props: CompilerProps, { params, error }: ValidatorData): Array<string> => {
      const code = props.name();

      return [
        l_condition(
          l_isObject(props.in)
        ),
        l_conditionBody(
          l_define(code, l_object()),
          ...passObjectParams({ ...props, out: code }, params),
          l_assign(props.out, code)
        ),
        l_conditionElse(
          l_assign(props.out, l_onError(props, error))
        )
      ];
    }
  }
};

const root = (semanticTree: Array<ValidatorData>) => {
  let code = 0;

  const parts: Array<any> = [];

  semanticTree.forEach(node => (
    parts.push(
      ...components[node.code][node.value](
        {
          in: l_value(),
          out: l_value(),
          name: () => `$${(code++).toString(26)}`
        },
        node
      )
    )
  ));

  parts.push(
    `return ${l_value()};`
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