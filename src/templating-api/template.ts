import { Validator } from '@lib/base-api/types';
import { composer } from '@lib/templating-api/composer';
import { lexicalAnalyzer } from '@lib/templating-api/lexical-analyzer';
import { semanticAnalyzer } from '@lib/templating-api/semantic-analyzer';
import { CompilerMeta, Errors, Injections, ValidatorData } from '@lib/templating-api/types';
import { validatorBase } from '@lib/templating-api/validators-base';

export const provide = (validators: Array<[(meta: CompilerMeta, data: ValidatorData) => Validator<any>, Array<string>]>) => (
  validators
    .forEach(([builder, names]) => names
      .forEach(name => validatorBase.set(name, builder))
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