import { template, tml } from '@lib/template/template';
import { baseCasesWithParams } from '@test/utilities';

'#value(10)'; // set 10 to 'value' dep

'#value(@string)'; // set validator to 'value' dep

'##value'; // force fetching from meta to val. seq.

'->[10, 20, 30]';

'!->[10, 20, 30]';

'@compare(>$0)!0 : @compare(<=$1)!0';
'@compare(>$0, <=$1)!0';

'@compare(>$0+100)';

`
  @object(
    $0 @number $1
  )
`;

'defined'; //??? m.b use only long name. Short only via 'compare'. m.b. defined | def

'empty'; //??? m.b. empty | emp

'fields'; // fields | f

'is'; // is | i

'unique'; // unique | u

'regex'; // regex | r or 'compare(*$0)'

'keysMap'; // keysMap | km

'valueMap'; // valueMap | vm

'consecutive'; // @seq

'parallel'; // @prll

'withFallback'; // ~f(123)

'useDefault'; // @default(123)

'dynamic'; // $... in seq

'or'; // @or

'strip'; // strip | stp ???

describe('base', () => {
  const validator = template(`
    @object(
      id : @number : @compare(>$0) : @compare(<=$1),
      name : @string : @length(>=10),
      roles : @array(
        @string : @length(<8)
      )
    )
  `);

  baseCasesWithParams(
    () => validator([0, () => 100]),
    [
      [[], { id: 1, name: 'MasterSais', roles: [] }],
      [[], { id: 100, name: 'MasterSais', roles: ['ADMIN'] }],
      [[], { id: 101, name: 'MasterSais', roles: ['ADMINADMIN'] }, { id: null, name: 'MasterSais', roles: [null] }],
      [[], { id: 0, name: 'MasterSais' }, { id: null, name: 'MasterSais', roles: null }],
      [[], { id: 'abc', name: 'Master' }, { id: null, name: null, roles: null }],
      [[], { id: -1, name: {}, roles: [undefined, 'ADMIN'] }, { id: null, name: null, roles: [null, 'ADMIN'] }]
    ],
    []
  );
});

describe('base › short', () => {
  const validator = tml`
    @o(
      id @n @c(>$0) @c(<=$1),
      name @s @l(>=10),
      roles @a(
        @s @l(<8)
      )
    )
  `;

  baseCasesWithParams(
    () => validator([0, () => 100]),
    [
      [[], { id: 1, name: 'MasterSais', roles: [] }],
      [[], { id: 100, name: 'MasterSais', roles: ['ADMIN'] }],
      [[], { id: 101, name: 'MasterSais', roles: ['ADMINADMIN'] }, { id: null, name: 'MasterSais', roles: [null] }],
      [[], { id: 0, name: 'MasterSais' }, { id: null, name: 'MasterSais', roles: null }],
      [[], { id: 'abc', name: 'Master' }, { id: null, name: null, roles: null }],
      [[], { id: -1, name: {}, roles: [undefined, 'ADMIN'] }, { id: null, name: null, roles: [null, 'ADMIN'] }]
    ],
    []
  );
});

describe('errors', () => {
  const validator = tml`
    @object(
      id : @number!err1 : @compare(>0)!err2,
      name : @string!err3 : @length(>=10)!err4
    ) ~error
  `;

  baseCasesWithParams(
    () => validator(null, { err1: 'ERR1', err2: () => 'ERR2', err3: 'ERR3', err4: () => 'ERR4' }),
    [
      [[], { id: 1, name: 'MasterSais' }, { result: { id: 1, name: 'MasterSais' }, errors: null }],
      [[], { id: 'abc', name: 'MasterSais' }, { result: { id: null, name: 'MasterSais' }, errors: ['ERR1'] }],
      [[], { id: 'abc', name: 'Master' }, { result: { id: null, name: null }, errors: ['ERR1', 'ERR4'] }],
      [[], { id: -1, name: 'Master' }, { result: { id: null, name: null }, errors: ['ERR2', 'ERR4'] }],
      [[], { id: -1, name: null }, { result: { id: null, name: null }, errors: ['ERR2', 'ERR3'] }]
    ],
    []
  );
});

describe('errors › short', () => {
  const validator = tml`
    @o(
      id @n!0 @c(>0)!1,
      name @s!2 @l(>=10)!3
    ) ~e
  `;

  baseCasesWithParams(
    () => validator(null, ['ERR1', () => 'ERR2', 'ERR3', () => 'ERR4']),
    [
      [[], { id: 1, name: 'MasterSais' }, { result: { id: 1, name: 'MasterSais' }, errors: null }],
      [[], { id: 'abc', name: 'MasterSais' }, { result: { id: null, name: 'MasterSais' }, errors: ['ERR1'] }],
      [[], { id: 'abc', name: 'Master' }, { result: { id: null, name: null }, errors: ['ERR1', 'ERR4'] }],
      [[], { id: -1, name: 'Master' }, { result: { id: null, name: null }, errors: ['ERR2', 'ERR4'] }],
      [[], { id: -1, name: null }, { result: { id: null, name: null }, errors: ['ERR2', 'ERR3'] }]
    ],
    []
  );
});