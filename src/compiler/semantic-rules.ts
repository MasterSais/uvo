import { DLM, EQ, GT, LFB, LRB, LSB, LT, RFB, RRB, RSB, VL, NOT, MLP } from './lexemes';

export const VALIDATOR_ENTRY_STATE = 0;

export const PARAMS_STATE = 3;

export const COMPARATOR_STATE = 5;

export const INJECTION_STATE = 6;

export const semanticRules = [
  /* S0 */ [LSB, 1, RSB, [[0], []]],                                                  // validator closure
  /* S1 */ [2, [[DLM, 1], []]],                                                       // validation sequence
  /* S2 */ [VL, [[LRB, 3, RRB], []]],                                                 // validator
  /* S3 */ [[[4], [0]]],                                                              // validator params
  /* S4 */ [[[5], []], [[VL], [6]]],                                                  // simple validator params
  /* S5 */ [[
    /* S5 */ [GT, [[EQ], []]], 
    /* S5 */ [LT, [[EQ], []]], 
    /* S5 */ [EQ], 
    /* S5 */ [NOT, [[EQ], [MLP]]], 
    /* S5 */ [MLP]
  /* S5 */ ]],                                                                        // comparator
  /* S6 */ [LFB, VL, RFB]                                                             // injection
];