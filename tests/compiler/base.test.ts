import { template } from '@lib/compiler';
import { baseCasesWithParams } from '@test/utilities';

describe('base', () => {
  const validator = template(`
    [object( 
      [id : number : compare(>0) : compare(<=100)]
      [name : string : length(>=10)]
      [roles : array(
        [string : length(<8)]
      )]
    )]
  `);

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