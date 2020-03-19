/* eslint-disable no-undef */

const L_VALIDATOR_OPEN = '[';
const L_VALIDATOR_CLOSE = ']';
const L_VALIDATOR_SEPARATOR = ':';

const lexemeBase = new Map([
  [L_VALIDATOR_OPEN, { code: 0 }],
  [L_VALIDATOR_CLOSE, { code: 1 }],
  [L_VALIDATOR_SEPARATOR, { code: 2 }]
]);

[' ', '\n', '\r'].forEach(literal => lexemeBase.set(literal, { omit: true }));

const analyze = (input) => {
  const lexemes = new Int8Array(input.length).fill(null);

  let index = 0;

  for (const literal of input) {
    const lexeme = lexemeBase.get(literal);

    if (lexeme === undefined) {
      throw `Unexpected literal: ${literal}`;
    }

    if (!lexeme.omit) {
      lexemes[index++] = lexeme.code;
    }
  }

  return lexemes.subarray(0, index);
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

console.log(result.toString());