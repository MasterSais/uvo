import { isArray, isFiniteNumber } from '@lib/classic-api/utilities';
import { CNT, DLM, ERR, INJ, REF, SQ, VL, VLD } from '@lib/templating-api/lexemes';
import { COMPARATOR_STATE, PARAMS_STATES, semanticRules } from '@lib/templating-api/semantic-rules';
import { Lexeme, ValidatorData } from '@lib/templating-api/types';

const onBeforeNestedState = (state: any, stack: Array<any>): Array<any> => (
  ([COMPARATOR_STATE, ...PARAMS_STATES].indexOf(state) >= 0)
    ? (stack.push([]), stack[stack.length - 1])
    : stack
);

const onAfterNestedState = (state: any, stack: Array<any>, nestedStack: Array<any>) => {
  if (state === COMPARATOR_STATE) {
    if (nestedStack.length > 0) {
      stack[stack.length - 1] = { value: nestedStack.join('') };
    } else {
      stack.pop();
    }
  }

  if (PARAMS_STATES.indexOf(state) >= 0) {
    stack[stack.length - 2].params = stack.pop();
  }
};

const onLexeme = (lexeme: Lexeme, state: any, stack: Array<any>) => {
  if (lexeme.omitToken) {
    return;
  }

  const prevLexeme = stack[stack.length - 1];

  if (state.code === VL.code && prevLexeme && [VLD.code, REF.code, INJ.code, CNT.code, SQ.code].indexOf(prevLexeme.code) >= 0) {
    prevLexeme[
      prevLexeme.error === true ? 'error' : 'value'
    ] = lexeme.value;

    return;
  }

  if (state.code === REF.code && prevLexeme && prevLexeme.code === REF.code) {
    prevLexeme.state = 1;

    return;
  }

  if (state.code === SQ.code && prevLexeme && prevLexeme.code === SQ.code) {
    return;
  }

  if (state.code === ERR.code) {
    prevLexeme.error = true;

    return;
  }

  const groupCode = [VLD.code, REF.code, INJ.code, DLM.code, CNT.code, VL.code].indexOf(state.code) >= 0;

  if (groupCode) {
    stack.push({ code: state.code, value: lexeme.value });

    return;
  }

  stack.push(lexeme.value);
};

const processState = (states: Array<any>, lexemes: Array<Lexeme>, offset: number, stack: Array<any>) => {
  for (let i = 0; i < states.length; i++) {
    const state = states[i];

    if (isFiniteNumber(state)) {
      const nestedStack = onBeforeNestedState(state, stack);

      offset = processState(semanticRules[state], lexemes, offset, nestedStack);

      onAfterNestedState(state, stack, nestedStack);

      if (offset === null) {
        return null;
      }

      continue;
    }

    if (isArray(state)) {
      let nestedOffset = null;

      for (const nestedState of state) {
        nestedOffset = processState(nestedState, lexemes, offset, stack);

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

    if (offset === lexemes.length) {
      return null;
    }

    const lexeme = lexemes[offset++];

    if (state.code >= 0 && lexeme.codes.indexOf(state.code) >= 0) {
      onLexeme(lexeme, state, stack);

      continue;
    }

    return null;
  }

  return offset;
};

export const semanticAnalyzer = (lexemes: Array<Lexeme>): Array<ValidatorData> => {
  const stack: Array<ValidatorData> = [];

  const offset = processState(semanticRules[0], lexemes, 0, stack);

  if (offset !== lexemes.length) {
    throw 'Semantic error';
  }

  return stack;
};