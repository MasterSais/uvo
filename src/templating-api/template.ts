import { Validator } from '@lib/base-api/types';
import { composer } from '@lib/templating-api/composer';
import { lexicalAnalyzer } from '@lib/templating-api/lexical-analyzer';
import { provider } from '@lib/templating-api/provider';
import { semanticAnalyzer } from '@lib/templating-api/semantic-analyzer';
import { ValidatorErrors, Injections } from '@lib/templating-api/types';
import { validatorBase } from '@lib/templating-api/validators-base';

export const provide = provider(validatorBase);

export const template = <T, R>(input: string): ((injections?: Injections, errors?: ValidatorErrors) => Validator<T, R>) => (
  composer(
    semanticAnalyzer(
      lexicalAnalyzer(input)
    )
  )
);

export const tml = <T, R>([input]: TemplateStringsArray): ((injections?: Injections, errors?: ValidatorErrors) => Validator<T, R>) => (
  template(input)
);