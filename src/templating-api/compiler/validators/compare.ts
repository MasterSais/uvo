import { Lengthy } from '@lib/base-api/types';
import { check, COMMA_SEPARATED_PARAMS } from '@lib/templating-api/compiler/errors';
import { l_and, l_assign, l_condition, l_conditionBody, l_conditionElse, l_content, l_onError } from '@lib/templating-api/compiler/units';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';

const compareTemplates = {
  '>=': (value: string, param: string) => `${value}>=${param}`,
  '<': (value: string, param: string) => `${value}<${param}`,
  '<=': (value: string, param: string) => `${value}<=${param}`,
  '>': (value: string, param: string) => `${value}>${param}`,
  '=': (value: string, param: string) => `${value}===${param}`,
  '!=': (value: string, param: string) => `${value}!==${param}`,
  '%': (value: string, param: string) => `${value}%${param}===0`,
  '!%': (value: string, param: string) => `${value}%${param}!==0`,
  '->': (value: string, param: string) => `${param}.indexOf(${value})>=0`,
  '!->': (value: string, param: string) => `${param}.indexOf(${value})<0`,
  '*': (value: string, param: string) => `${param}.test(${value})`,
  '!*': (value: string, param: string) => `!${param}.test(${value})`
};

const lengthTemplates = {
  '>=': (value: Lengthy, param: string) => `${value}.length>=${param}`,
  '<': (value: Lengthy, param: string) => `${value}.length<${param}`,
  '<=': (value: Lengthy, param: string) => `${value}.length<=${param}`,
  '>': (value: Lengthy, param: string) => `${value}.length>${param}`,
  '=': (value: Lengthy, param: string) => `${value}.length===${param}`,
  '!=': (value: Lengthy, param: string) => `${value}.length!==${param}`,
  '%': (value: Lengthy, param: string) => `${value}.length%${param}===0`,
  '!%': (value: Lengthy, param: string) => `${value}.length%${param}!==0`
};

const comparatorTemplate = (comparators: Record<string, (value: string, param: string) => string>) => (props: CompilerProps, data: ValidatorData): Array<string> => {
  check(props, data, COMMA_SEPARATED_PARAMS);

  const conditions: Array<string> = [];

  for (let i = 0; i < data.params.length; i += 3) {
    conditions.push(
      comparators[data.params[i].value](
        props.in,
        data.params[i + 1].value
      )
    );
  }

  return ([
    l_condition(
      l_and(...conditions)
    ),
    l_conditionBody(
      ...l_content(props)
    ),
    l_conditionElse(
      l_assign(props.out, l_onError(props, data.error))
    )
  ]);
};

export const compareTemplate = comparatorTemplate(compareTemplates);

export const lengthTemplate = comparatorTemplate(lengthTemplates);