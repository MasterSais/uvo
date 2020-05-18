import { l_injections } from '@lib/templating-api/compiler/units';
import { CNT, GR, INJ, SQ, VL, VLD } from '@lib/templating-api/lexemes';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';

export const extract = (components: Map<number, any>, data: ValidatorData): ((...args: any) => Array<string>) => {
  if (data.code === VLD.code || data.code === CNT.code || data.code === GR.code) {
    const component = components.get(data.code)[data.value];

    if (!component) {
      throw `Unsupported component: '${data.value}'`;
    }

    return component;
  }

  if (data.code === INJ.code) {
    const injection = `${l_injections()}['${data.value}']`;

    return () => [
      `(typeof ${injection} === 'function' ? ${injection}() : ${injection})`
    ];
  }

  if (data.code === VL.code) {
    // type check
    return () => [data.value];
  }

  if (data.code === SQ.code) {
    return () => [`'${data.value}'`];
  }

  throw `Unsupported code: '${data.code}'`;
};

export const chain = (props: CompilerProps, nodes: Array<ValidatorData>): Array<string> => (
  nodes.length > 0
    ? extract(props.cmps, nodes[0])(
      {
        ...props,
        content: nodes.slice(1).length > 0 ? (props: CompilerProps) => chain(props, nodes.slice(1)) : null
      },
      nodes[0]
    )
    : []
);