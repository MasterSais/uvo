import { lexicalAnalyzer } from './lexical-analyzer.js';
import { semanticAnalyzer } from './semantic-analyzer.js';
import { composer } from './composer.js';
import { lexemeBase } from './lexemes.js';
import { semanticRules } from './semantic-rules.js';

const test = (
  `
    [object(
      [createdAt : date : compare(>{0})]
      [updatedAt : date : compare(>=createdAt)]
      [deletedAt : date : compare(>=updatedAt)]
      [user : object( 
        [id : number : compare(>=0)]
        [name : string : length(>10)]
      )]
    )]
  `
);

const lexemes = lexicalAnalyzer(test, lexemeBase);

console.log(lexemes.map(({ value, code }) => ({ code, value })));

semanticAnalyzer(semanticRules, 0, lexemes);

console.log(composer(lexemes));

export const template = (input) => {
  const lexemes = lexicalAnalyzer(input, lexemeBase);

  semanticAnalyzer(semanticRules, 0, lexemes);

  return composer(lexemes);
};