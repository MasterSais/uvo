import { PARAMS_STATE, semanticRules as rules, VALIDATOR_ENTRY_STATE } from './semantic-rules.js';

const processState = (state, lexemes, index, stack) => {
  let offset = index;

  for (let i = 0; i < state.length; i++) {
    if (Number.isFinite(state[i])) {
      if (state[i] === PARAMS_STATE) {
        stack.push([]);

        stack = stack[stack.length - 1];
      }

      if (state[i] === VALIDATOR_ENTRY_STATE) {
        stack.push('$e');
      }

      offset = processState(rules[state[i]], lexemes, offset, stack);

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

    if (state[i].code !== undefined && lexemes[offset].code === state[i].code) {
      if (lexemes[offset].composerToken) {
        stack.push(lexemes[offset].value);
      }

      offset++;

      continue;
    }

    return null;
  }

  return offset;
};

export const semanticAnalyzer = (lexemes) => {
  const stack = [];

  const offset = processState(rules[0], lexemes, 0, stack);

  console.log(stack);

  if (offset !== lexemes.length) {
    throw 'Semantic error';
  }
};