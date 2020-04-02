import { lexemeBase } from './lexemes';
import { Lexeme } from './types';

export const lexicalAnalyzer = (input: string): Array<Lexeme> => {
  const lexemes = new Array<Lexeme>(input.length);

  let index = 0;

  for (const literal of input) {
    const lexeme = lexemeBase.get(literal);

    if (!lexeme) {
      throw `Unexpected literal: '${literal}'`;
    }

    if (!lexeme.omit) {
      const compound = (
        lexeme.compound && index > 0 && lexemes[index - 1].compound && lexeme.codes[0] === lexemes[index - 1].codes[0]
      );

      if (compound) {
        lexemes[index - 1].value = lexemes[index - 1].value + lexeme.value;
      } else {
        lexemes[index++] = { ...lexeme };
      }
    }
  }

  return lexemes.slice(0, index);
};