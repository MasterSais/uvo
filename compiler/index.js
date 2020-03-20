/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const literals = require('./literals');

const analyze = (input) => {
  const lexemes = new Array(input.length);

  let index = 0;

  for (const literal of input) {
    const lexeme = literals.base.get(literal);

    if (lexeme === undefined) {
      throw `Unexpected literal: '${literal}'`;
    }

    if (!lexeme.omit) {
      const compound = (
        lexeme.compound && index > 0 && lexemes[index - 1].compound && lexeme.code === lexemes[index - 1].code
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

const result = analyze(
  `
    [object : 
      [createdAt : date : compare(>{0})]
      [updatedAt : date : compare(>=createdAt)]
      [deletedAt : date : compare(>=updatedAt)]
      [user : object : 
        [id : number : compare(>=0)]
        [name : string : length(>10)]
      ]
    ]
  `
);

console.log(result.map(({ value, code }) => ({ code, value })));