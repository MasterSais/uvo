import { lexemeBase } from '@lib/templating-api/lexemes';
import { Lexeme } from '@lib/templating-api/types';

export const lexicalAnalyzer = (input: string): Array<Array<Lexeme>> => {
  const tokens = new Array<Array<Lexeme>>(input.length);

  let index = 0;

  for (let i = 0; i < input.length; i++) {
    const literal = input[i];

    if (literal.charCodeAt(0) < 32) {
      continue;
    }

    const lexemes = lexemeBase.get(literal);

    if (!lexemes) {
      throw `Unexpected literal: '${literal}' on position: ${i}`;
    }

    let lexemeTokens: Array<Lexeme> = [];

    for (let i = 0; i < lexemes.length; i++) {
      if (!lexemes[i].omit) {
        const compound = (
          lexemes[i].compound && index > 0 && tokens[index - 1].find(({ code }) => code === lexemes[i].code)
        );

        if (compound) {
          compound.value = compound.value + lexemes[i].value;
          tokens[index - 1] = [compound];
          lexemeTokens = [];

          break;
        }

        lexemeTokens.push({ ...lexemes[i] });
      }
    }

    lexemeTokens.length > 0 && (tokens[index++] = lexemeTokens);
  }

  tokens.length = index;

  return tokens;
};