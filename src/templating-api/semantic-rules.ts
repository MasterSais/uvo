import { CND, CNT, DLM, DLM2, EQ, ERR, GR, GRC, GT, INJ, LCB, LRB, LSB, LT, MLP, MNS, NOT, RCB, REF, RRB, RSB, SQ, VL, VLD } from '@lib/templating-api/lexemes';

export const semanticRules: Array<Array<any>> = [
  /* S00 */[[2, 3, 4, 5], [[[DLM2, CND, []], 0], 9, []]],                  // validators sequence
  /* S01 */[[2, 3, 4, 5, VL], [DLM, DLM2, CND, []], [1, []]],              // validators as params
  /* S02 */[VLD, 6, [[ERR, VL], []]],                                      // validator
  /* S03 */[REF, [REF, []], 6],                                            // reference
  /* S04 */[INJ, 6],                                                       // injection
  /* S05 */[GR, [LRB, LSB, LCB], -1, [RRB, RSB, RCB], GRC],                // grouper
  /* S06 */[VL, [[LRB, [[-1, RRB], [-7, RRB]]], []]],                      // validator params
  /* S07 */[8, [VL, 3, 4, [SQ, VL, SQ]], [[DLM, 7], []]],                  // simple validator params
  /* S08 */[[
    /* S08 */[GT, [EQ, []]],
    /* S08 */[LT, [EQ, []]],
    /* S08 */ EQ,
    /* S08 */ MLP,
    /* S08 */[MNS, GT],
    /* S08 */[NOT, [EQ, MLP, [MNS, GT]]],
    /* S08 */[]
  /* S08 */]],                                                             // comparator
  /* S09 */[CNT, 6, [9, []]]                                               // containers
];