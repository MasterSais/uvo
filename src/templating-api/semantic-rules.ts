import { CND, CNT, DLM, DLM2, EQ, ERR, GR, GRC, GT, INJ, LCB, LRB, LSB, LT, MLP, MNS, NOT, RCB, REF, RGX, RRB, RSB, SQ, VL, VLD } from '@lib/templating-api/lexemes';

export const semanticRules: Array<Array<any>> = [
  /* S0 */ [[2, 3, 4, 5], [[[DLM2, CND, []], 0], 9, []]],                  // validators sequence
  /* S1 */ [[2, 3, 4, 5, VL], [DLM, DLM2, CND, []], [1, []]],              // validators as params
  /* S2 */ [VLD, VL, 6, [[ERR, VL], []]],                                  // validator
  /* S3 */ [REF, [REF, []], [VL, []], 6],                                  // reference
  /* S4 */ [INJ, VL, 6],                                                   // injection
  /* S5 */ [GR, [LRB, LSB, LCB], -1, [RRB, RSB, RCB], GRC],                // grouper
  /* S6 */ [[[LRB, [[-1, RRB], [-7, RRB]]], []]],                          // validator params
  /* S7 */ [8, [VL, 3, 4, [SQ, VL, SQ]], [[DLM, 7], []]],                  // simple validator params
  /* S8 */ [[
    /* S8 */ [GT, [EQ, []]],
    /* S8 */ [LT, [EQ, []]],
    /* S8 */  EQ,
    /* S8 */  MLP,
    /* S8 */  RGX,
    /* S8 */ [MNS, GT],
    /* S8 */ [NOT, [EQ, MLP, RGX, [MNS, GT]]],
    /* S8 */ []
  /* S8 */ ]],                                                             // comparator
  /* S9 */ [CNT, VL, 6, [9, []]]                                           // containers
];