import { Lexeme, LexemeScheme } from './types';

let code = 0;

const makeLexeme = (literals: Array<string>, omitToken?: boolean, omit?: boolean, compound?: boolean): LexemeScheme => ({
  literals, code: code++, omitToken, omit, compound
});

export const VLD: LexemeScheme = makeLexeme(['@']);

export const ERR: LexemeScheme = makeLexeme(['!']);

export const INJ: LexemeScheme = makeLexeme(['$']);

export const REF: LexemeScheme = makeLexeme(['#']);

export const CNT: LexemeScheme = makeLexeme(['~']);

export const LRB: LexemeScheme = makeLexeme(['('], true);

export const RRB: LexemeScheme = makeLexeme([')'], true);

export const SQ: LexemeScheme = makeLexeme(['\'']);

export const DLM: LexemeScheme = makeLexeme([',']);

export const DLM2: LexemeScheme = makeLexeme([':'], true);

export const GT: LexemeScheme = makeLexeme(['>']);

export const LT: LexemeScheme = makeLexeme(['<']);

export const EQ: LexemeScheme = makeLexeme(['=']);

export const NOT: LexemeScheme = makeLexeme(['!']);

export const MLP: LexemeScheme = makeLexeme(['%']);

export const MNS: LexemeScheme = makeLexeme(['-']);

export const OMT: LexemeScheme = makeLexeme([' ', '\n', '\r'], false, true);

export const VL: LexemeScheme = makeLexeme('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_.-+0123456789'.split(''), false, false, true);

export const lexemeBase = new Map<string, Lexeme>();

[VLD, ERR, INJ, REF, CNT, LRB, RRB, SQ, DLM, DLM2, GT, LT, EQ, NOT, MLP, MNS, OMT, VL].forEach(
  ({ code, literals, compound, omit, omitToken }) => literals.forEach(literal =>
    lexemeBase.has(literal)
      ? (
        lexemeBase.get(literal).codes.push(code),
        lexemeBase.get(literal).compound = compound
      )
      : lexemeBase.set(literal, { codes: [code], value: literal, compound, omit, omitToken })
  )
);