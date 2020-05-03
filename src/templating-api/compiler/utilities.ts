import { CompilerProps, ValidatorData } from '@lib/templating-api/types';

export const chain = (props: CompilerProps, field: string, [first, ...nodes]: Array<ValidatorData>) => (
  props.cmps.get(first.code)[first.value](
    {
      ...props,
      content: nodes.length > 0 ? (props: CompilerProps) => chain(props, field, nodes) : null
    },
    first
  )
);