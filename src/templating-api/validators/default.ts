import { withFallback } from '@lib/base-api/containers/with-fallback';
import { useDefault } from '@lib/base-api/spreaders/use-default';
import { Validator } from '@lib/base-api/types';
import { extractInjection, extractLiteral, extractSequence } from '@lib/templating-api/extractors';
import { CompilerMeta, ValidatorData } from '@lib/templating-api/types';

const spreaderBuilder = (validator: (...args: any) => Validator<any>) => (meta: CompilerMeta, { params: [fallback, , ...nodes] }: ValidatorData) => {
  const validators: Array<Validator<any, any>> = [];

  for (const validator of nodes) {
    validators.push(
      extractSequence(meta, validator)
    );
  }

  return (
    extractLiteral(fallback, (value: any) => validator(value(), ...validators)) ||
    extractInjection(meta, fallback, (value: any) => validator(value, ...validators))
  );
};

export const defaultBuilder = spreaderBuilder(useDefault);

export const fallbackBuilder = spreaderBuilder(withFallback);