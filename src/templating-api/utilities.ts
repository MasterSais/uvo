import { isEmpty } from '@lib/base-api/utilities/types';
import { CNT, GR, INJ, REF, SQ, VL, VLD } from '@lib/templating-api/lexemes';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';
import { l_quoted } from '@lib/templating-api/units';
import { injectionTemplate } from '@lib/templating-api/validators/injection';
import { referenceTemplate } from '@lib/templating-api/validators/reference';

export const extract = (components: Map<number, any>, data: ValidatorData): ((...args: any) => Array<string>) => {
  if (data.code === VLD.code || data.code === CNT.code || data.code === GR.code) {
    const component = components.get(data.code)[data.value];

    if (!component) {
      throw `Unsupported component: '${data.value}'`;
    }

    return component;
  }

  if (data.code === INJ.code) {
    return injectionTemplate;
  }

  if (data.code === VL.code) {
    return ['def', 'emp'].includes(data.value)
      ? () => [l_quoted(data.value)]
      : () => [data.value];
  }

  if (data.code === SQ.code) {
    return () => [l_quoted(data.value)];
  }

  if (data.code === REF.code) {
    return referenceTemplate;
  }

  throw `Unsupported code: '${data.code}'`;
};

export const chain = (props: CompilerProps, nodes: Array<ValidatorData>): Array<string> => (
  nodes.length > 0
    ? extract(props.components, nodes[0])(
      {
        ...props,
        content: nodes.slice(1).length > 0 ? (props: CompilerProps) => chain(props, nodes.slice(1)) : null
      },
      nodes[0]
    )
    : []
);

export const setMeta = (props: CompilerProps, data: { validator?: string; path?: string | number; params?: Array<any> }): CompilerProps => ({
  ...props,
  meta: props.meta && ({
    ...props.meta,
    validator: data.validator,
    params: data.params || [],
    path: !isEmpty(data.path) ? props.meta.path.concat(data.path) : props.meta.path
  })
});

export const getRefs = (props: CompilerProps, data: ValidatorData): Array<string> => {
  const refs: Array<string> = [];

  if (data.code === REF.code) {
    refs.push(referenceTemplate({ ...props, internal: true }, data).join(''));
  }

  if (data.params) {
    for (const param of data.params) {
      if (param.code === REF.code) {
        refs.push(referenceTemplate({ ...props, internal: true }, param).join(''));
      }
    }
  }

  return refs;
};