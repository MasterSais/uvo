import { Validator } from '../types';
import { composer } from './composer';
import { lexicalAnalyzer } from './lexical-analyzer';
import { semanticAnalyzer } from './semantic-analyzer';
import { Injections } from './types';

export const template = <T, R>(input: string): ((containers?: string) => (injections: Injections) => Validator<T, R>) => (
  composer(
    semanticAnalyzer(
      lexicalAnalyzer(input)
    )
  )
);