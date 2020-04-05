import { CNT, DLM, DLM2, EQ, ERR, GT, INJ, LRB, LT, MLP, MNS, NOT, REF, RRB, SQ, VL, VLD } from './lexemes';

export const PARAMS_STATE = 4;

export const COMPARATOR_STATE = 6;

export const semanticRules = [
  /* S0 */ [[[1], [2], [VL]], [[DLM, 0], [DLM2, 0], [0], [7], []]],                   // validators sequence
  /* S1 */ [VLD, VL, [[LRB, 4, RRB], []], [[ERR, VL], []]],                           // validator
  /* S2 */ [REF, VL],                                                                 // reference
  /* S3 */ [INJ, VL],                                                                 // injection
  /* S4 */ [[[0], [5]]],                                                              // validator params
  /* S5 */ [[[6], []], [[VL], [2], [3], [SQ, VL, SQ]]],                               // simple validator params
  /* S6 */ [[
    /* S6 */ [GT, [[EQ], []]],
    /* S6 */ [LT, [[EQ], []]],
    /* S6 */ [EQ],
    /* S6 */ [MLP],
    /* S6 */ [MNS, GT],
    /* S6 */ [NOT, [[EQ], [MLP], [MNS, GT]]]
  /* S6 */ ]],                                                                        // comparator
  /* S7 */ [CNT, VL, [[7], []]]                                                      // containers
];