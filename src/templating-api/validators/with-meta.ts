import { withMeta } from '@lib/classic-api/containers/with-meta';
import { Validator } from '@lib/classic-api/types';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractInjection } from '@lib/templating-api/utilities';

export const metaBuilder = (meta: CompilerMeta, { params }: ValidatorData) => (
  (validator: Validator<any>) => (
    params
      ? extractInjection(meta, params[0], (value: any) => (
        withMeta(validator, value)
      ))
      : withMeta(validator)
  )
);