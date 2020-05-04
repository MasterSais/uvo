import { l_injections } from '@lib/templating-api/compiler/units';
import { CNT, GR, INJ, SQ, VL, VLD } from '@lib/templating-api/lexemes';
import { CompilerProps, ValidatorData } from '@lib/templating-api/types';

// const reservedValues: { [name: string]: any } = {
//   'true': true,
//   'false': false,
//   'null': null
// };

export const extract = (components: Map<number, any>, data: ValidatorData) => {
  if (data.code === VLD.code || data.code === CNT.code || data.code === GR.code) {
    const component = components.get(data.code)[data.value];

    if (!component) {
      throw `Unsupported component: '${data.value}'`;
    }

    return component;
  }

  if (data.code === INJ.code) {
    const injection = `${l_injections()}['${data.value}']`;

    return () => `(typeof ${injection} === 'function' ? ${injection}() : ${injection})`;
  }

  if (data.code === VL.code) {
    // type check
    return () => data.value;
  }

  if (data.code === SQ.code) {
    return () => `'${data.value}'`;
  }
};

export const chain = (props: CompilerProps, field: string, [first, ...nodes]: Array<ValidatorData>) => (
  extract(props.cmps, first)(
    {
      ...props,
      content: nodes.length > 0 ? (props: CompilerProps) => chain(props, field, nodes) : null
    },
    first
  )
);