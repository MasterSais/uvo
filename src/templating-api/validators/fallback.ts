import { withFallback } from '@lib/base-api/containers/with-fallback';
import { Validator } from '@lib/base-api/types';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';
import { extractInjection, extractLiteral, extractSequence } from '@lib/templating-api/utilities';

export const fallbackBuilder = (meta: CompilerMeta, { params: [fallback, , ...nodes] }: ValidatorData) => {
  const validators: Array<Validator<any, any>> = [];

  for (const validator of nodes) {
    validators.push(
      extractSequence(meta, validator)
    );
  }

  return (
    extractLiteral(fallback, (value: any) => withFallback(value(), ...validators)) ||
    extractInjection(meta, fallback, (value: any) => withFallback(value, ...validators))
  );
};