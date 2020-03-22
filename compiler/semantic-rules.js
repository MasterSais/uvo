/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

import { DLM, EQ, GT, LFB, LRB, LSB, LT, RFB, RRB, RSB, VL } from './lexemes.js';

export const semanticRules = [
  /* S0 */ [LSB, 1, RSB, [[0], []]],                      // validator closure
  /* S1 */ [2, [[DLM, 1], []]],                           // validation sequence
  /* S2 */ [VL, [[LRB, [[3], [0]], RRB], []]],            // validator
  /* S3 */ [[[4], []], [[VL], [5]]],                      // validator params
  /* S4 */ [[[GT, [[EQ], []]], [LT, [[EQ], []]], [EQ]]],  // comparator
  /* S5 */ [LFB, VL, RFB]                                 // injection
];