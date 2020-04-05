import { Validator } from '../types';
import { composer } from './composer';
import { lexicalAnalyzer } from './lexical-analyzer';
import { semanticAnalyzer } from './semantic-analyzer';
import { Injections } from './types';

export const template = <T, R>(input: string): ((injections?: Injections, errors?: Injections) => Validator<T, R>) => (
  composer(
    semanticAnalyzer(
      lexicalAnalyzer(input)
    )
  )
);

export const tml = <T, R>([input]: TemplateStringsArray): ((injections?: Injections, errors?: Injections) => Validator<T, R>) =>
  template(input);