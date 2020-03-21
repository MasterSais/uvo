/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const l = require('./literals');

const [
  LSB, RSB, LRB, RRB, LFB, RFB, DLM, GT, LT, EQ, VL
] = [l.LSB, l.RSB, l.LRB, l.RRB, l.LFB, l.RFB, l.DLM, l.GT, l.LT, l.EQ, l.VL].map(({ code }) => `L${code}`);

const rules = [
  /* S0 */ `${LSB} S1 ${RSB}`,                                    // validator closure
  /* S1 */ `S2 (E | (${DLM} (S0 | S1)))`,                         // validation sequence
  /* S2 */ `${VL} (E | (${LRB} S3 ${RRB}))`,                      // validator
  /* S3 */ `(S4 | E) (${VL} | S5)`,                               // validator params
  /* S4 */ `(${GT} (E | ${EQ})) | (${LT} (E | ${EQ})) | ${EQ}`,   // comparator
  /* S5 */ `${LFB} ${VL} ${RFB}`                                  // injection
];

module.exports = rules;