import { Validator } from '@lib/classic-api/types';
import { composer } from '@lib/templating-api/composer';
import { lexicalAnalyzer } from '@lib/templating-api/lexical-analyzer';
import { semanticAnalyzer } from '@lib/templating-api/semantic-analyzer';
import { Errors, Injections } from '@lib/templating-api/types';

export const template = <T, R>(input: string): ((injections?: Injections, errors?: Errors) => Validator<T, R>) => (
  composer(
    semanticAnalyzer(
      lexicalAnalyzer(input)
    )
  )
);

export const tml = <T, R>([input]: TemplateStringsArray): ((injections?: Injections, errors?: Errors) => Validator<T, R>) =>
  template(input);