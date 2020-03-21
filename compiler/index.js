/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { lexicalAnalyzer } = require('./lexical-analyzer');
const { semanticAnalyzer } = require('./semantic-analyzer');
const { semanticRules } = require('./semantic-rules');

const lexemes = lexicalAnalyzer(
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

console.log(lexemes.map(({ value, code }) => ({ code, value })));

console.log(semanticAnalyzer(semanticRules, 0, lexemes));