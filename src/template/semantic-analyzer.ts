import { GT, REF, VL, VLD, INJ, DLM } from './lexemes';
import { COMPARATOR_STATE, PARAMS_STATE, semanticRules } from './semantic-rules';
import { Lexeme, ValidatorData } from './types';

const processState = (state: Array<any>, lexemes: Array<Lexeme>, index: number, stack: Array<any>) => {
  let offset = index;

  for (let i = 0; i < state.length; i++) {
    if (Number.isFinite(state[i])) {
      let nestedStack = stack;

      if ([COMPARATOR_STATE, PARAMS_STATE].indexOf(state[i]) >= 0) {
        nestedStack.push([]);

        nestedStack = nestedStack[stack.length - 1];
      }

      offset = processState(semanticRules[state[i]], lexemes, offset, nestedStack);

      if (state[i] === COMPARATOR_STATE) {
        if (nestedStack.length > 0) {
          stack[stack.length - 1] = {
            code: GT.code,
            value: nestedStack.join(String())
          };
        } else {
          stack.pop();
        }
      }

      if (state[i] === PARAMS_STATE) {
        stack[stack.length - 2].params = stack.pop();
      }

      if (offset === null) {
        return null;
      }

      continue;
    }

    if (Array.isArray(state[i])) {
      let nestedOffset = null;

      for (const nestedState of state[i]) {
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

    const lexeme = lexemes[offset];

    if (state[i].code !== undefined && lexeme.code === state[i].code) {
      if (!lexeme.omitToken) {
        if (lexeme.code === VL.code && stack[stack.length - 1] && [VLD.code, REF.code, INJ.code].indexOf(stack[stack.length - 1].code) >= 0) {
          stack[stack.length - 1].value = lexeme.value;
        }
        else if ([VLD.code, REF.code, INJ.code, DLM.code, VL.code].indexOf(lexeme.code) >= 0) {
          stack.push({ code: lexeme.code, value: lexeme.value });
        }
        else {
          stack.push(lexeme.value);
        }
      }

      offset++;

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