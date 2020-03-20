/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const {
  L_ENTRY, L_END,
  L_VALIDATOR_OPEN, L_VALIDATOR_CLOSE,
  L_PARAMS_OPEN, L_PARAMS_CLOSE,
  L_EXTERNAL_PARAMS_OPEN, L_EXTERNAL_PARAMS_CLOSE,
  L_VALIDATOR_SEPARATOR,
  L_GREATER, L_LOWER, L_EQUAL,
  L_EXCESS, L_LITERALS
} = require('./literals');

const {
  S_ENTRY, S_NESTED,
  S_OUTPUT
} = require('./states');

// `
//   [object : 
//     [createdAt : date : compare(>{0})]
//     [updatedAt : date : compare(>=createdAt)]
//     [deletedAt : date : compare(>=updatedAt)]
//     [user : object : 
//       [id : number : compare(>=0)]
//       [name : string : length(>10)]
//     ]
//   ]
// `;

const throwError = (expected, received, prev) => {
  throw `Expected one of [${expected}] after '${prev}'. Received: '${received}'`;
};

const stateMachine = new Map([
  [S_ENTRY, (lexeme, prev) => {
    [L_VALIDATOR_OPEN.code].includes(lexeme.code)
      ? S_NESTED
      : throwError([L_VALIDATOR_OPEN.value], lexeme.value, prev.value);
  }]
]);

module.exports = stateMachine;