import { CNT, DLM, DLM2, EQ, ERR, GT, INJ, LRB, LT, MLP, MNS, NOT, REF, RRB, SQ, VL, VLD } from '@lib/templating-api/lexemes';

export const PARAMS_STATES = [6, 7];

export const COMPARATOR_STATE = 9;

export const semanticRules = [
  /* S00 */ [2, [[DLM2, 0], [0], [10], []]],                                           // validators sequence
  /* S01 */ [[[2], [3], [VL]], [[DLM], [DLM2], []], [[1], []]],                        // validators as params
  /* S02 */ [VLD, VL, 5, [[ERR, VL], []]],                                             // validator
  /* S03 */ [REF, VL, 5],                                                              // reference
  /* S04 */ [INJ, VL, 5],                                                              // injection
  /* S05 */ [[[LRB, 6, RRB], [LRB, 7, RRB], []]],                                      // validator params
  /* S06 */ [8],                                                                       // validator params 1
  /* S07 */ [1],                                                                       // validator params 2
  /* S08 */ [[[9], []], [[VL], [3], [4], [SQ, VL, SQ]]],                               // simple validator params
  /* S09 */ [[
    /* S09 */ [GT, [[EQ], []]],
    /* S09 */ [LT, [[EQ], []]],
    /* S09 */ [EQ],
    /* S09 */ [MLP],
    /* S09 */ [MNS, GT],
    /* S09 */ [NOT, [[EQ], [MLP], [MNS, GT]]]
  /* S09 */ ]],                                                                        // comparator
  /* S10 */ [CNT, VL, 5, [[10], []]]                                                   // containers
];