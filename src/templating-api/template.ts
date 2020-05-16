import { Validator } from '@lib/base-api/types';
import { compiler, interpreter } from '@lib/templating-api/compiler/compiler';
import { composer } from '@lib/templating-api/composer';
import { lexicalAnalyzer } from '@lib/templating-api/lexical-analyzer';
import { provider } from '@lib/templating-api/provider';
import { semanticAnalyzer } from '@lib/templating-api/semantic-analyzer';
import { Errors, Injections } from '@lib/templating-api/types';
import { validatorBase } from '@lib/templating-api/validators-base';

export const provide = provider(validatorBase);

export const interpret = <T, R>(input: string): string => (
  interpreter(
    semanticAnalyzer(
      lexicalAnalyzer(input)
    )
  )
);

export const compile = <T, R>(input: string): ((injections?: Injections, errors?: Errors) => Validator<T, R>) => (
  compiler(
    semanticAnalyzer(
      lexicalAnalyzer(input)
    )
  )
);

export const template = <T, R>(input: string): ((injections?: Injections, errors?: Errors) => Validator<T, R>) => (
  composer(
    semanticAnalyzer(
      lexicalAnalyzer(input)
    )
  )
);

export const tml = <T, R>([input]: TemplateStringsArray): ((injections?: Injections, errors?: Errors) => Validator<T, R>) => (
  template(input)
);