import { withErrors } from '@lib/classic-api/containers/with-errors';
import { Validator } from '@lib/classic-api/types';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractInjection } from '@lib/templating-api/utilities';

export const errorsBuilder = (meta: CompilerMeta, { params }: ValidatorData) => (
  (validator: Validator<any>) => (
    params
      ? extractInjection(meta, params[0], (value: any) => (
        withErrors(validator, value)
      ))
      : withErrors(validator)
  )
);