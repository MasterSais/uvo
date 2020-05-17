import { isArray, isFiniteNumber, toArray } from '@lib/base-api/utilities/types';
import { CND, CNT, ERR, GR, GT, INJ, LCB, LRB, LSB, MNS, REF, SQ, VL, VLD } from '@lib/templating-api/lexemes';
import { semanticRules } from '@lib/templating-api/semantic-rules';
import { Lexeme, LexemeScheme, ValidatorData } from '@lib/templating-api/types';

const onBeforeNestedState = (state: number, stack: Array<ValidatorData>): Array<ValidatorData> => (
  state < 0
    ? (stack[stack.length - 1].params = [])
    : stack
);

const withValueCodes = [VLD.code, REF.code, INJ.code, CNT.code, SQ.code];

const onLexeme = (lexeme: Lexeme, state: LexemeScheme, stack: Array<ValidatorData>) => {
  if (lexeme.omitToken) {
    return;
  }

  const prevLexeme = stack[stack.length - 1];

  if (prevLexeme) {
    if (state.code === VL.code) {
      if (VLD.code === prevLexeme.code && prevLexeme.code2 === ERR.code) {
        prevLexeme.error = lexeme.value;

        return;
      }

      if (withValueCodes.indexOf(prevLexeme.code) >= 0) {
        prevLexeme.value = lexeme.value;

        return;
      }
    }

    if (state.code === CND.code) {
      prevLexeme.code2 = CND.code;

      return;
    }

    if (state.code === REF.code && prevLexeme.code === REF.code) {
      prevLexeme.code2 = REF.code;

      return;
    }

    if (state.code === SQ.code && prevLexeme.code === SQ.code) {
      return;
    }

    if (state.code === ERR.code) {
      prevLexeme.code2 = ERR.code;

      return;
    }

    if (state.code >= GT.code && state.code <= MNS.code && prevLexeme.code >= GT.code && prevLexeme.code <= MNS.code) {
      prevLexeme.value += lexeme.value;

      return;
    }

    if (state.code === LRB.code || state.code === LSB.code || state.code === LCB.code) {
      if (prevLexeme.code === GR.code) {
        prevLexeme.value = lexeme.value;
        prevLexeme.code = GR.code;
      }

      return;
    }
  }

  if (state.code === REF.code) {
    lexeme.value = null;
  }

  stack.push(lexeme);
};

const processState = (states: Array<any>, tokens: Array<Array<Lexeme>>, offset: number, stack: Array<ValidatorData>) => {
  for (let i = 0; i < states.length; i++) {
    const state = states[i];

    if (isFiniteNumber(state)) {
      const nestedStack = onBeforeNestedState(state, stack);

      offset = processState(semanticRules[Math.abs(state)], tokens, offset, nestedStack);

      if (offset === null) {
        return null;
      }

      continue;
    }

    if (isArray(state)) {
      let nestedOffset = null;

      for (const nestedState of state) {
        nestedOffset = processState(toArray(nestedState), tokens, offset, stack);

        if (nestedOffset !== null) {
          break;
        }
      }

      if (nestedOffset === null) {
        return null;
      }

      offset = nestedOffset;

      continue;
    }

    if (offset === tokens.length) {
      return null;
    }

    const lexeme = state.code >= 0 && tokens[offset].find(({ code }) => state.code === code);

    offset++;

    if (lexeme) {
      onLexeme(lexeme, state, stack);

      continue;
    }

    return null;
  }

  return offset;
};

export const semanticAnalyzer = (lexemes: Array<Array<Lexeme>>): Array<ValidatorData> => {
  const stack: Array<ValidatorData> = [];

  const offset = processState(semanticRules[0], lexemes, 0, stack);

  if (offset !== lexemes.length) {
    throw 'Semantic error';
  }

  return stack;
};