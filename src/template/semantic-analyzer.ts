import { isArray, isFiniteNumber } from '../utilities';
import { DLM, ERR, GT, INJ, REF, VL, VLD } from './lexemes';
import { COMPARATOR_STATE, PARAMS_STATE, semanticRules } from './semantic-rules';
import { Lexeme, ValidatorData } from './types';

const processState = (state: Array<any>, lexemes: Array<Lexeme>, index: number, stack: Array<any>) => {
  let offset = index;

  for (let i = 0; i < state.length; i++) {
    if (isFiniteNumber(state[i])) {
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

    if (isArray(state[i])) {
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

    const lexeme = lexemes[offset++];

    if (state[i].code !== undefined && lexeme.codes.indexOf(state[i].code) >= 0) {
      if (lexeme.omitToken) {
        continue;
      }

      if (state[i].code === VL.code && stack[stack.length - 1] && [VLD.code, REF.code, INJ.code].indexOf(stack[stack.length - 1].code) >= 0) {
        stack[stack.length - 1].value = lexeme.value;

        continue;
      }

      if (state[i].code === ERR.code && lexemes[offset] && stack[stack.length - 1] && lexemes[offset].codes.indexOf(VL.code) >= 0) {
        stack[stack.length - 1].error = lexemes[offset++].value;

        i++;

        continue;
      }

      const groupCode = [VLD.code, REF.code, INJ.code, DLM.code, VL.code].indexOf(state[i].code) >= 0;

      if (groupCode) {
        stack.push({ code: state[i].code, value: lexeme.value });

        continue;
      }

      stack.push(lexeme.value);

      continue;
    }

    return null;
  }

  return offset;
};

export const semanticAnalyzer = (lexemes: Array<Lexeme>): Array<ValidatorData> => {
  const stack: Array<ValidatorData> = [];

  const offset = processState(semanticRules[0], lexemes, 0, stack);
  console.log(JSON.stringify(stack))

  if (offset !== lexemes.length) {
    throw 'Semantic error';
  }

  return stack;
};