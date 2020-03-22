import { LSB, RSB, LRB, RRB, LFB, RFB, DLM, GT, LT, EQ, VL } from './lexemes.js';

export const composer = (lexemes) => {
  for (const lexeme of lexemes) {
    if (lexeme.code === VL.code) {
      console.log(lexeme.value);
    }
  }
};