export const cases: Array<any> = [
  [[/num1|num2|num3|num4/], { num1: 1, num2: 1, num3: 1, num4: 1 }, { num1: 1, num2: 1, num3: 1, num4: 1 }],
  [[/num1|num2|num3|num4/], { num1: 1, num2: -1, num3: 1, num4: 'abc' }, { num1: 1, num2: null, num3: 1, num4: null }],
  [[/num1|num2/], { num1: -1, num2: -1, num3: -1, num4: -1 }, { num1: null, num2: null }],
  [[() => /num1|num2/], { num1: -1, num2: -1, num3: -1, num4: -1 }, { num1: null, num2: null }],
  [[['num1', 'num2', 'num3', 'num4']], { num1: 1, num2: -1, num3: 1, num4: 'abc' }, { num1: 1, num2: null, num3: 1, num4: null }],
  [[['num1', 'num2', 'num3', 'num4']], { num1: 1, num2: 1, num3: 1, num4: 1 }, { num1: 1, num2: 1, num3: 1, num4: 1 }],
];