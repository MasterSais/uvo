import { Validator } from '../types';
import { composer } from './composer';
import { lexicalAnalyzer } from './lexical-analyzer';
import { semanticAnalyzer } from './semantic-analyzer';

export const template = <T, R>(input: string): Validator<T, R> => (
  composer(
    semanticAnalyzer(
      lexicalAnalyzer(input)
    )
  )
);