import { composer } from './composer.js';
import { lexicalAnalyzer } from './lexical-analyzer.js';
import { semanticAnalyzer } from './semantic-analyzer.js';

const test = (
  `
    [object(
      [createdAt : date : compare(>{0})]
      [updatedAt : date : compare(>=createdAt)]
      [user : object( 
        [id : number : compare(>=0)]
        [name : string : length(>10)]
      )]
      [roles : array(
        [string : length(<10)]
      )]
      [deletedAt : date : compare(>=updatedAt)]
    )]
  `
);

const lexemes = lexicalAnalyzer(test);

const semanticTree = semanticAnalyzer(lexemes);

composer(semanticTree);

export const template = (input) => (
  composer(
    semanticAnalyzer(
      lexicalAnalyzer(input)
    )
  )
);