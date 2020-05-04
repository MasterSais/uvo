import { Error } from '@lib/base-api/types';
import { CompilerProps } from '@lib/templating-api/types';

export const l_value = () => 'v';

export const l_injections = () => 'i';

export const l_errors = () => 'e';

export const l_or = (...body: Array<string>) => `${body.join('||')}`;

export const l_and = (...body: Array<string>) => `${body.join('&&')}`;

export const l_object = () => '{}';

export const l_emptyString = () => '\'\'';

export const l_if = (...conditions: Array<string>) => `if(${conditions.join('')})`;

export const l_ifBody = (...body: Array<string>) => `{${body.join('')}}`;

export const l_content = (props: CompilerProps) => props.content ? props.content(props) : [];

export const l_else = () => `else `;

export const l_return = (value: string) => `return ${value};`;

export const l_assign = (dest: string, src: string) => `${dest}=${src};`;

export const l_valueOf = (input: string) => `${input}.valueOf()`;

export const l_define = (code: string, value: string) => `let ${code}=${value};`;

export const l_equal = (code: string, value: string) => `${code}===${value}`;

export const l_not = (input: string) => `!${input}`;

export const l_notEqual = (code: string, value: string) => `${code}!==${value}`;

export const l_trim = (value: string) => `${value}.trim()`;

export const l_isString = (input: string) => `typeof ${input}==='string'`;

export const l_isNaN = (input: string) => `isNaN(${input})`;

export const l_toDate = (input: string) => `new Date(${input})`;

export const l_toString = (input: string) => `${input}+''`;

export const l_isNumber = (input: string) => `typeof ${input}==='number'`;

export const l_isDefined = (input: string) => `!isNaN(${input})`;

export const l_toNumber = (input: string) => `+${input}`;

export const l_isBoolean = (input: string) => `typeof ${input}==='boolean'`;

export const l_isObject = (input: string) => `${input}.constructor===Object`;

export const l_isFinite = (input: string) => `isFinite(${input})`;

export const l_group = (...body: Array<string>) => `(${body.join('')})`;

export const l_onError = (props: CompilerProps, error: Error) => (
  props.err ? `(onError(${l_errors()}[${error}],meta),null)` : 'null'
);