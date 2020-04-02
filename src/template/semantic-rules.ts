import { DLM, DLM2, EQ, ERR, GT, INJ, LRB, LT, MLP, NOT, REF, RRB, SQ, VL, VLD } from './lexemes';

export const PARAMS_STATE = 3;

export const COMPARATOR_STATE = 5;

export const semanticRules = [
  /* S0 */ [[[1], [2], [VL]], [[DLM, 0], [DLM2, 0], [0], []]],                        // validators sequence
  /* S1 */ [VLD, VL, [[LRB, 3, RRB], []], [[ERR, VL], []]],                           // validator
  /* S2 */ [REF, VL],                                                                 // reference
  /* S3 */ [[[0], [4]]],                                                              // validator params
  /* S4 */ [[[5], []], [[VL], [INJ, VL], [REF, VL], [SQ, VL, SQ]]],                   // simple validator params
  /* S5 */ [[
    /* S5 */ [GT, [[EQ], []]],
    /* S5 */ [LT, [[EQ], []]],
    /* S5 */ [EQ],
    /* S5 */ [NOT, [[EQ], [MLP]]],
    /* S5 */ [MLP]
  /* S5 */ ]]                                                                         // comparator
];