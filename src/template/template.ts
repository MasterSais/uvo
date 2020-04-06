import { Validator } from '../types';
import { composer } from './composer';
import { lexicalAnalyzer } from './lexical-analyzer';
import { semanticAnalyzer } from './semantic-analyzer';
import { Errors, Injections } from './types';

export const template = <T, R>(input: string): ((injections?: Injections, errors?: Errors) => Validator<T, R>) => (
  composer(
    semanticAnalyzer(
      lexicalAnalyzer(input)
    )
  )
);

export const tml = <T, R>([input]: TemplateStringsArray): ((injections?: Injections, errors?: Errors) => Validator<T, R>) =>
  template(input);