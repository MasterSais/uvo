const processState = (state, rules, lexemes, index) => {
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
      let nestedOffset = null;

      for (const nestedState of state[i]) {
        nestedOffset = processState(nestedState, rules, lexemes, offset);

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
      offset++;

      continue;
    }

    return null;
  }

  return offset;
};

export const semanticAnalyzer = (rules, initialRuleIndex, lexemes) => {
  const offset = processState(rules[initialRuleIndex], rules, lexemes, 0);

  if (offset !== lexemes.length) {
    throw 'Semantic error';
  }
};