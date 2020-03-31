import { template } from '@lib/compiler/template';
import { baseCasesWithParams } from '@test/utilities';

// %o(
//   id %n %c(>$0) %c(<=$1) #id,
//   name %s %l(>=10),
//   roles %a(%s %l(<8)) %l(<2)
// )

// %object(
//   id : %number : %compare(>$0) : %compare(<=$1) : #id,
//   name : %string : %length(>=10),
//   roles : %array(%string : %length(<8)) : %length(<2)
// )

describe('base', () => {
  const validator = template(`
    [object(
      [id : number : compare(>{0}) : compare(<={1})]
      [name : string : length(>=10)]
      [roles : array(
        [string : length(<8)]
      )]
    )]
  `)()([0, () => 100]);

  baseCasesWithParams(
    () => validator,
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