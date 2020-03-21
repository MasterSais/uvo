/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const analyze = require('./analizer');
const stateMachine = require('./state-machine');
const rules = require('./rules');

const lexemes = analyze(
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
console.log(rules);

stateMachine(rules, lexemes);