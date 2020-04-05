import { template, tml } from '@lib/template/template';
import { baseCasesWithParams } from '@test/utilities';

'#value(10)'; // set 10 to 'value' dep

'#value(@string)'; // set validator to 'value' dep

'##value'; // force fetching from meta to val. seq.

'->[10, 20, 30]';

'!->[10, 20, 30]';

'@compare(>$0)!0 : @compare(<=$1)!0';
'@compare(>$0, <=$1)!0';

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