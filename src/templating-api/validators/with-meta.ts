import { withMeta } from '@lib/base-api/containers/with-meta';
import { Validator } from '@lib/base-api/types';
import { extractInjection } from '@lib/templating-api/extractors';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

export const metaBuilder = (meta: CompilerMeta, { params }: ValidatorData) => (
  (validator: Validator<any>) => (
    params
      ? extractInjection(meta, params[0], (value: any) => (
        withMeta(validator, value)
      ))
      : withMeta(validator)
  )
);