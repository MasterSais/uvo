import { CompilerProps } from '@lib/templating-api/types';

export const l_value = () => 'v';

export const l_result = () => 'result';

export const l_resultErrors = () => 'errors';

export const l_injections = () => 'i';

export const l_errors = (error?: string | number) => error ? `e['${error}']` : 'e';

export const l_errorsCounter = () => 'ei';

export const l_or = (...body: Array<string>) => `${body.join('||')}`;

export const l_and = (...body: Array<string>) => `${body.join('&&')}`;

export const l_object = (...body: Array<[string, string]>) => `{${body.map(row => row.join(':')).join(',')}}`;

export const l_null = () => 'null';

export const l_undefined = () => 'undefined';

export const l_quoted = (input: string) => `'${input}'`;

export const l_ret = (input: string) => `return ${input}`;

export const l_length = (input: string) => `${input}.length`;

export const l_emptyString = () => l_quoted('');

export const l_if = (...body: Array<string>) => `if(${body.join('')})`;

export const l_ifBody = (...body: Array<string>) => `{${body.join('')}}`;

export const l_content = (props: CompilerProps) => props.content ? props.content(props) : [];

export const l_else = () => 'else ';

export const l_assign = (dest: string, src: string) => `${dest}=${src};`;

export const l_for = (input: string, index: string, callee: (elem: string) => Array<string>) => (
  `for (var ${index} = ${l_length(input)} - 1; ${index} >= 0; ${index}--) {${callee(`${input}[${index}]`).join('')}}`
);

export const l_slice = (input: string) => `${input}.slice(0)`;

export const l_valueOf = (input: string) => `${input}.valueOf()`;

export const l_define = (code: string, value: string) => `var ${code}=${value};`;

export const l_compare = (code: string, value: string, comparator: string) => `${code}${comparator}${value}`;

export const l_equal = (code: string, value: string) => l_compare(code, value, '===');

export const l_not = (input: string) => `!${input}`;

export const l_typeof = (input: string) => `typeof ${input}`;

export const l_notEqual = (code: string, value: string) => l_compare(code, value, '!==');

export const l_trim = (value: string) => `${value}.trim()`;

export const l_indexOf = (input: string, value: string) => `${input}.indexOf(${value})`;

export const l_test = (input: string, value: string) => `${input}.test(${value})`;

export const l_isString = (input: string) => l_equal(l_typeof(input), l_quoted('string'));

export const l_isNaN = (input: string) => `isNaN(${input})`;

export const l_toDate = (input: string) => `new Date(${input})`;

export const l_toString = (input: string) => `${input}+''`;

export const l_isNumber = (input: string) => l_equal(l_typeof(input), l_quoted('number'));

export const l_isDefined = (input: string) => `!isNaN(${input})`;

export const l_isArray = (input: string) => `Array.isArray(${input})`;

export const l_toNumber = (input: string) => `+${input}`;

export const l_isBoolean = (input: string) => l_equal(l_typeof(input), l_quoted('boolean'));

export const l_isFunction = (input: string) => l_equal(l_typeof(input), l_quoted('function'));

export const l_isObject = (input: string) => l_equal(`${input}.constructor`, 'Object');

export const l_isFinite = (input: string) => `isFinite(${input})`;

export const l_embrace = (...body: Array<string>) => `(${body.join('')})`;

export const l_square = (input: string) => `[${input}]`;

export const l_return = (props: CompilerProps): Array<string> => ([
  ...props.errors
    ?
    [
      l_if(
        l_compare(l_errorsCounter(), '0', '>')
      ),
      l_ifBody(
        l_assign(l_length(props.errors), l_errorsCounter()),
        l_ret(
          l_object(
            [l_result(), props.out],
            [l_resultErrors(), props.errors]
          )
        )
      ),
      l_else(),
      l_ifBody(
        l_ret(
          l_object(
            [l_result(), props.out],
            [l_resultErrors(), l_null()]
          )
        )
      )
    ]
    :
    [
      l_ret(props.out)
    ]
]);

export const l_error = (props: CompilerProps, error: string | number): Array<string> => ([
  ...(
    (props.errors && error)
      ?
      [
        l_if(
          l_isFunction(l_errors(error))
        ),
        l_ifBody(
          l_assign(`${props.errors}[${l_errorsCounter()}++]`, l_errors(error) + l_embrace(
            props.meta && (
              l_object(
                ['validator', l_quoted(props.meta.validator)],
                ['path', l_square(props.meta.path.toString())],
                ['params', l_square(props.meta.params.toString())],
              )
            )
          ))
        ),
        l_else(),
        l_ifBody(
          l_assign(`${props.errors}[${l_errorsCounter()}++]`, l_errors(error))
        )
      ]
      : []
  ),
  l_assign(props.out, l_null())
]);