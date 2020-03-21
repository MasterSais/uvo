/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const processState = (state, rules, lexemes, index = 0) => {
  let offset = index;

  for (let i = 0; i < state.length; i++) {
    if (Number.isFinite(state[i])) {
      offset = processState(rules[state[i]], rules, lexemes, offset);

      if (offset === null) {
        return null;
      }

      continue;
    }

    if (Array.isArray(state[i])) {
      const rightOne = state[i].find((nestedState) => {
        const nestedOffset = processState(nestedState, rules, lexemes, offset);

        if (nestedOffset !== null) {
          offset = nestedOffset;

          return true;
        }
      });

      if (rightOne === undefined) {
        return null;
      }

      continue;
    }

    if (offset === lexemes.length) {
      return null;
    }

    if (state[i].code !== undefined && lexemes[offset].code === state[i].code) {
      offset++;

      continue;
    }

    return null;
  }

  return offset;
};

const stateMachine = (rules, initialRuleIndex, lexemes) =>
  processState(rules[initialRuleIndex], rules, lexemes) === lexemes.length;

module.exports = stateMachine;