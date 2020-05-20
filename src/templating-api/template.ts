import { CompiledValidator } from '@lib/base-api/types';
import { compiler, interpreter } from '@lib/templating-api/compiler';
import { lexicalAnalyzer } from '@lib/templating-api/lexical-analyzer';
import { semanticAnalyzer } from '@lib/templating-api/semantic-analyzer';
import { Errors, Injections } from '@lib/templating-api/types';

// export const provide = provider(validatorBase);

export const interpret = <T, R>(input: string): string => (
  interpreter(
    semanticAnalyzer(
      lexicalAnalyzer(input)
    )
  )
);

export const compile = <T, R>(input: string): ((injections?: Injections, errors?: Errors) => CompiledValidator<T, R>) => (
  compiler(
    semanticAnalyzer(
      lexicalAnalyzer(input)
    )
  )
);